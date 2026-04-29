import { useState, useEffect } from 'react';

const API_KEY = 'AIzaSyALkKmqkfhiRnzL2eHHpmD41A-8c2ozmlw';
const MAIN_FOLDER_ID = '1qZU3gx46W5bz1AewvDRQonMIicOGxka8';

export function useDriveCMS() {
  const [cmsData, setCmsData] = useState({ projects: [], experience: [], achievements: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        // 1. Get subfolders inside main folder
        const subRes = await fetch(`https://www.googleapis.com/drive/v3/files?q='${MAIN_FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}&fields=files(id,name)`);
        const subData = await subRes.json();
        
        if (!subData.files) {
          setLoading(false);
          return;
        }

        // Map subfolder IDs
        const folders = {
          projects: subData.files.find(f => f.name.toLowerCase() === 'projects')?.id,
          experience: subData.files.find(f => f.name.toLowerCase() === 'experience')?.id,
          achievements: subData.files.find(f => f.name.toLowerCase() === 'achievements')?.id,
        };

        const result = { projects: [], experience: [], achievements: [] };

        // 2. Fetch contents for each subfolder
        for (const [key, folderId] of Object.entries(folders)) {
          if (!folderId) continue;

          const filesRes = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)&orderBy=name`);
          const filesData = await filesRes.json();

          if (filesData.files) {
            const filesByName = {};

            filesData.files.forEach(file => {
              const cleanName = file.name.replace(/\.[^/.]+$/, "");
              const isExtra = /_\d+$/.test(cleanName);
              const mainName = cleanName.replace(/_\d+$/, "");

              if (!filesByName[mainName]) filesByName[mainName] = { title: mainName, extraImages: [] };

              if (file.mimeType.startsWith('image/')) {
                if (isExtra) filesByName[mainName].extraImages.push(file.id);
                else filesByName[mainName].imageId = file.id;
              } else if (file.mimeType === 'text/plain') {
                filesByName[mainName].textId = file.id;
              }
            });

            // Parse text contents
            result[key] = await Promise.all(
              Object.values(filesByName)
                .filter(p => p.imageId || p.textId) 
                .map(async (p) => {
                  let rawText = "";
                  if (p.textId) {
                    try {
                      const textRes = await fetch(`https://www.googleapis.com/drive/v3/files/${p.textId}?alt=media&key=${API_KEY}`);
                      if (textRes.ok) rawText = await textRes.text();
                    } catch(e) {
                      console.error("Failed to fetch text", e);
                    }
                  }

                  const parsed = {
                    title: p.title,
                    imageUrl: p.imageId ? `https://drive.google.com/uc?export=view&id=${p.imageId}` : null,
                    extraImages: p.extraImages.map(id => `https://drive.google.com/uc?export=view&id=${id}`),
                    description: rawText,
                  };

                  // Parse metadata lines (e.g., Tech: React, Node)
                  const lines = rawText.split('\n');
                  const descIndex = lines.findIndex(l => l.trim().toLowerCase().startsWith('description:'));
                  
                  if (descIndex !== -1) {
                    parsed.description = lines.slice(descIndex + 1).join('\n').trim();
                    const metaLines = lines.slice(0, descIndex);
                    metaLines.forEach(line => {
                      const [k, ...v] = line.split(':');
                      if (k && v.length) {
                        parsed[k.trim().toLowerCase()] = v.join(':').trim();
                      }
                    });
                  } else {
                    // Fallback parsing if no "Description:" keyword exists
                    const descParts = [];
                    lines.forEach(line => {
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

                  // Process specific fields
                  if (parsed.tech && typeof parsed.tech === 'string') {
                    parsed.tech = parsed.tech.split(',').map(t => t.trim());
                  }

                  return parsed;
                })
            );
          }
        }

        setCmsData(result);
      } catch (error) {
        console.error("Failed to fetch CMS data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  return { ...cmsData, loading };
}
