export const experienceSections = [
  {
    key: "volunteering",
    title: "Volunteering",
    items: [
      {
        role: "IEEE Communications Society — Webmaster",
        org: "University / Chapter",
        period: "2025 — Present",
        highlights: [
          "Maintained chapter web presence and content updates",
          "Coordinated announcements for events and activities",
        ],
      },
      {
        role: "Volunteer",
        org: "Tech/Student Community Events",
        period: "2024 — 2025",
        highlights: [
          "Supported event logistics and participant coordination",
          "Assisted with basic technical setup and documentation",
        ],
      },
    ],
  },
  {
    key: "hackathons",
    title: "Hackathons",
    items: [
      {
        role: "Participant",
        org: "MoraXtreme Hackathon",
        period: "2024",
        highlights: [
          "Collaborated under time constraints to ship a working prototype",
          "Practiced rapid problem-solving and team communication",
        ],
      },
    ],
  },
  {
    key: "leadership",
    title: "Leadership",
    items: [
      {
        role: "Team Lead / Coordinator",
        org: "Engineering Projects",
        period: "2024 — 2025",
        highlights: [
          "Planned milestones and divided tasks across the team",
          "Ensured consistent progress updates and documentation",
        ],
      },
    ],
  },
];

export function getExperienceSection(key) {
  return experienceSections.find((s) => s.key === key);
}
