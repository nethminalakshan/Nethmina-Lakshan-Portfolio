"use client";

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const next = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setProgress(Math.max(0, Math.min(1, next)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60]">
      <div
        className="h-full bg-amber/80"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />
    </div>
  );
}
