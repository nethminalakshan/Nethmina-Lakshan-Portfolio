export const skillGroups = [
  {
    key: "networking",
    title: "Networking",
    items: [
      "TCP/IP",
      "Routing",
      "Subnetting",
      "Network Security",
      "Cisco Packet Tracer",
      "Wireshark",
    ],
  },
  {
    key: "embedded",
    title: "Embedded Systems",
    items: [
      "Microcontrollers",
      "ATmega",
      "PIC",
      "Arduino",
      "Sensor Interfacing",
      "Real-time Systems",
    ],
  },
  {
    key: "programming",
    title: "Programming",
    items: ["C", "C++", "Python", "JavaScript", "SQL"],
  },
  {
    key: "tools",
    title: "Tools & Technologies",
    items: ["Git", "Linux", "Proteus", "MATLAB", "Docker"],
  },
];

export function getSkillGroup(key) {
  return skillGroups.find((g) => g.key === key);
}
