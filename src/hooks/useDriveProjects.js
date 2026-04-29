import { useState, useEffect } from 'react';

const API_KEY = 'AIzaSyALkKmqkfhiRnzL2eHHpmD41A-8c2ozmlw';
const FOLDER_ID = '1qZU3gx46W5bz1AewvDRQonMIicOGxka8';

export function useDriveProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDriveFiles() {
      try {
        // Fetch all files in the folder (images and text files)
        const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,description)&orderBy=createdTime desc`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.files) {
          const filesByName = {};

          // Group files by their name without extension
          data.files.forEach(file => {
            const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
            if (!filesByName[nameWithoutExt]) {
              filesByName[nameWithoutExt] = { title: nameWithoutExt };
            }

            if (file.mimeType.startsWith('image/')) {
              filesByName[nameWithoutExt].imageId = file.id;
            } else if (file.mimeType === 'text/plain') {
              filesByName[nameWithoutExt].textId = file.id;
            } else {
               // Fallback to description field if they didn't upload a text file
               filesByName[nameWithoutExt].description = file.description;
            }
          });

          // Fetch text content for projects that have a .txt file
          const driveProjects = await Promise.all(
            Object.values(filesByName)
              .filter(p => p.imageId) // Only keep valid projects with an image
              .map(async (p) => {
                let rawText = p.description || "A project managed directly from Google Drive.";
                
                // If they provided a text file, fetch its contents
                if (p.textId) {
                  try {
                    const textRes = await fetch(`https://www.googleapis.com/drive/v3/files/${p.textId}?alt=media&key=${API_KEY}`);
                    if (textRes.ok) {
                      rawText = await textRes.text();
                    }
                  } catch (e) {
                    console.error("Failed to fetch text file", e);
                  }
                }

                let tags = ["Drive CMS"];
                let description = rawText;
                
                // Parse tags like [React, Node]
                const tagMatch = rawText.match(/\[(.*?)\]/);
                if (tagMatch) {
                  tags = tagMatch[1].split(',').map(t => t.trim());
                  description = rawText.replace(tagMatch[0], '').trim() || description;
                }

                return {
                  id: p.imageId,
                  title: p.title,
                  description,
                  tags,
                  imageUrl: `https://drive.google.com/uc?export=view&id=${p.imageId}`
                };
              })
          );
          
          setProjects(driveProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects from Google Drive", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDriveFiles();
  }, []);

  return { projects, loading };
}
