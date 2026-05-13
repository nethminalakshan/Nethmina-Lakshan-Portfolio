import { NextResponse } from 'next/server';

function getEnv(name, fallback) {
  const v = process.env[name];
  if (typeof v === 'string' && v.trim()) return v.trim();
  return fallback;
}

async function fetchJson(url) {
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Upstream error ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return '';
  return res.text();
}

function parseDriveText(title, rawText) {
  const parsed = {
    title,
    description: rawText,
  };

  const lines = String(rawText || '').split('\n');
  const descIndex = lines.findIndex((l) => l.trim().toLowerCase().startsWith('description:'));

  if (descIndex !== -1) {
    parsed.description = lines.slice(descIndex + 1).join('\n').trim();
    const metaLines = lines.slice(0, descIndex);
    metaLines.forEach((line) => {
      const [k, ...v] = line.split(':');
      if (k && v.length) parsed[k.trim().toLowerCase()] = v.join(':').trim();
    });
  } else {
    const descParts = [];
    lines.forEach((line) => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0 && colonIndex < 20) {
        const k = line.slice(0, colonIndex).trim().toLowerCase();
        const v = line.slice(colonIndex + 1).trim();
        parsed[k] = v;
      } else {
        descParts.push(line);
      }
    });
    parsed.description = descParts.join('\n').trim();
  }

  if (typeof parsed.tech === 'string') {
    parsed.tech = parsed.tech
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }

  return parsed;
}

export async function GET() {
  try {
    const API_KEY = getEnv('GOOGLE_DRIVE_API_KEY', 'AIzaSyALkKmqkfhiRnzL2eHHpmD41A-8c2ozmlw');
    const MAIN_FOLDER_ID = getEnv('GOOGLE_DRIVE_MAIN_FOLDER_ID', '1qZU3gx46W5bz1AewvDRQonMIicOGxka8');

    const subUrl = `https://www.googleapis.com/drive/v3/files?q='${MAIN_FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}&fields=files(id,name)`;
    const subData = await fetchJson(subUrl);

    const folders = {
      projects: subData.files?.find((f) => f.name?.toLowerCase() === 'projects')?.id,
      experience: subData.files?.find((f) => f.name?.toLowerCase() === 'experience')?.id,
      achievements: subData.files?.find((f) => f.name?.toLowerCase() === 'achievements')?.id,
    };

    const result = { projects: [], experience: [], achievements: [] };

    for (const [key, folderId] of Object.entries(folders)) {
      if (!folderId) continue;

      const filesUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)&orderBy=name`;
      const filesData = await fetchJson(filesUrl);
      if (!filesData.files) continue;

      const filesByName = {};

      filesData.files.forEach((file) => {
        const cleanName = String(file.name || '').replace(/\.[^/.]+$/, '');
        const isExtra = /_\d+$/.test(cleanName);
        const mainName = cleanName.replace(/_\d+$/, '');

        if (!filesByName[mainName]) filesByName[mainName] = { title: mainName, extraImages: [] };

        if (file.mimeType?.startsWith('image/')) {
          if (isExtra) filesByName[mainName].extraImages.push(file.id);
          else filesByName[mainName].imageId = file.id;
        } else if (file.mimeType === 'text/plain') {
          filesByName[mainName].textId = file.id;
        }
      });

      result[key] = await Promise.all(
        Object.values(filesByName)
          .filter((p) => p.imageId || p.textId)
          .map(async (p) => {
            let rawText = '';
            if (p.textId) {
              const textUrl = `https://www.googleapis.com/drive/v3/files/${p.textId}?alt=media&key=${API_KEY}`;
              rawText = await fetchText(textUrl);
            }

            const parsed = parseDriveText(p.title, rawText);

            return {
              ...parsed,
              imageUrl: p.imageId ? `/api/drive/media?id=${p.imageId}` : null,
              extraImages: (p.extraImages || []).map((id) => `/api/drive/media?id=${id}`),
            };
          })
      );
    }

    return NextResponse.json({ ...result, loading: false }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { projects: [], experience: [], achievements: [], loading: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
