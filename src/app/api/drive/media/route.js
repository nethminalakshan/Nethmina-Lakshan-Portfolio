import { NextResponse } from 'next/server';

function getEnv(name, fallback) {
  const v = process.env[name];
  if (typeof v === 'string' && v.trim()) return v.trim();
  return fallback;
}

function isSafeDriveId(id) {
  return typeof id === 'string' && /^[a-zA-Z0-9_-]{10,}$/.test(id);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!isSafeDriveId(id)) {
    return NextResponse.json({ error: 'Missing or invalid id' }, { status: 400 });
  }

  // NOTE: Prefer env vars; keep fallbacks to avoid breaking current setup.
  const apiKey = getEnv('GOOGLE_DRIVE_API_KEY', 'AIzaSyALkKmqkfhiRnzL2eHHpmD41A-8c2ozmlw');

  const commonFetchOptions = {
    redirect: 'follow',
    headers: {
      // Helps avoid Google returning HTML "Sorry" pages for non-browser user agents.
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    },
    next: { revalidate: 86400 },
  };

  // 1) Try Drive API (fast + correct content-type) if the key permits media downloads.
  const apiUrl = `https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${apiKey}`;
  let upstreamRes = await fetch(apiUrl, commonFetchOptions);

  // 2) Fallback: public download endpoint (works for publicly shared files even if API media is blocked).
  if (!upstreamRes.ok) {
    const ucUrl = `https://drive.google.com/uc?export=download&id=${id}`;
    upstreamRes = await fetch(ucUrl, commonFetchOptions);
  }

  if (!upstreamRes.ok) {
    const text = await upstreamRes.text().catch(() => '');
    return NextResponse.json(
      { error: 'Failed to fetch media', status: upstreamRes.status, details: text.slice(0, 500) },
      { status: 502 }
    );
  }

  const contentType = upstreamRes.headers.get('content-type') || 'application/octet-stream';

  return new NextResponse(upstreamRes.body, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      // Helpful for Next/edge caching and the browser.
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
