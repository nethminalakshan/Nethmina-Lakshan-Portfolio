export const workSteps = [
  {
    title: "Research",
    desc:
      "Understand the problem, users, and goals before designing solutions.",
  },
  {
    title: "Analyze",
    desc: "Turn insights into clear requirements and a plan for execution.",
  },
  {
    title: "Design",
    desc: "Create clean UI flows, prototypes, and reusable components.",
  },
  {
    title: "Launch",
    desc: "Ship, test, and iterate based on feedback and real usage.",
  },
];

export const portfolioItems = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: "Product Admin Dashboard",
  desc: "A clean, modern dashboard layout with cards and data blocks.",
  imageKey: i % 2 === 0 ? "homepage" : "frame",
}));

export const blogItems = [
  {
    title: "Design systems: where to start",
    date: "Mar 16, 2026",
    imageKey: "frame",
  },
  {
    title: "Building a portfolio that converts",
    date: "Mar 16, 2026",
    imageKey: "homepage",
  },
  {
    title: "UX tips for better landing pages",
    date: "Mar 16, 2026",
    imageKey: "frame",
  },
];
