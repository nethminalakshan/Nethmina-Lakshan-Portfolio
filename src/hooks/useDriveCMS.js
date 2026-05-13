import { useState, useEffect } from 'react';

export function useDriveCMS() {
  const [cmsData, setCmsData] = useState({ projects: [], experience: [], achievements: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;

    async function fetchAll() {
      try {
        const res = await fetch('/api/cms');
        const data = await res.json();
        if (canceled) return;

        setCmsData({
          projects: data.projects || [],
          experience: data.experience || [],
          achievements: data.achievements || [],
        });
      } catch (error) {
        if (!canceled) console.error('Failed to fetch CMS data', error);
      } finally {
        if (!canceled) setLoading(false);
      }
    }

    fetchAll();
    return () => {
      canceled = true;
    };
  }, []);

  return { ...cmsData, loading };
}
