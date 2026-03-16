const projects = [
  {
    id: "organ-availability-alert",
    title: "Organ Availability Alert System",
    category: "embedded",
    technologies: ["C", "Microcontrollers", "Sensor Interfacing"],
    description:
      "An embedded system concept to detect key parameters and trigger real-time alerts for critical availability scenarios.",
    githubUrl: "https://github.com/",
  },
  {
    id: "smart-bus-booking",
    title: "Smart Bus Booking System",
    category: "software",
    technologies: ["JavaScript", "React", "SQL"],
    description:
      "A web-based booking flow with availability, seat selection, and booking confirmation.",
    githubUrl: "https://github.com/",
  },
  {
    id: "line-following-robot",
    title: "Line Following Robot",
    category: "embedded",
    technologies: ["Arduino", "Sensors", "Control Logic"],
    description:
      "A robot that follows a line track using sensor feedback and a simple control algorithm.",
    githubUrl: "https://github.com/",
  },
  {
    id: "autonomous-underwater-vehicle",
    title: "Autonomous Underwater Vehicle (AUV)",
    category: "embedded",
    technologies: ["Embedded Systems", "Sensors", "System Design"],
    description:
      "A concept AUV platform focusing on modular electronics, sensing, and autonomy foundations.",
    githubUrl: "https://github.com/",
  },
  {
    id: "network-simulation-labs",
    title: "Network Simulation Projects",
    category: "networking",
    technologies: ["TCP/IP", "Routing", "Cisco Packet Tracer"],
    description:
      "Packet Tracer / simulation labs covering subnetting, routing, and basic network security scenarios.",
    githubUrl: "https://github.com/",
  },
];

export function getProjects() {
  return projects;
}

export function getProjectById(id) {
  return projects.find((p) => p.id === id);
}

export function getProjectsByCategory(category) {
  if (!category || category === "all") return projects;
  return projects.filter((p) => p.category === category);
}
