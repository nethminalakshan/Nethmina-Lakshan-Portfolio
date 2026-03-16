const blogPosts = [
  {
    id: "tcp-ip-model",
    title: "Understanding the TCP/IP Model",
    date: "March 2026",
    summary:
      "A practical overview of the TCP/IP layers and how data moves across a network.",
    content: [
      "The TCP/IP model is a simplified view of how data is packaged, addressed, transmitted, routed, and received.",
      "In practice, you’ll work most often with the Application, Transport (TCP/UDP), Internet (IP), and Link layers.",
      "When troubleshooting, mapping symptoms to a layer helps narrow down causes quickly (DNS vs routing vs cabling).",
    ],
  },
  {
    id: "atmega32-getting-started",
    title: "Getting Started with ATmega32",
    date: "March 2026",
    summary:
      "Key concepts for setting up ATmega32 projects: IO, timers, interrupts, and toolchain basics.",
    content: [
      "ATmega32 is a classic 8-bit AVR microcontroller that’s great for learning embedded fundamentals.",
      "Start with GPIO: configure DDR registers, write PORT bits, and read PIN state for inputs.",
      "Then move to timers and interrupts for precise timing and responsive behavior.",
    ],
  },
  {
    id: "nrf24l01-wireless",
    title: "How the nRF24L01 Wireless Module Works",
    date: "March 2026",
    summary:
      "An intuitive explanation of packet-based 2.4GHz communication with common practical tips.",
    content: [
      "nRF24L01 communicates over SPI and provides a packet-based radio link with built-in addressing.",
      "Reliability improves with proper power decoupling, correct channel selection, and sensible data rates.",
      "Testing with simple send/ack examples makes it easier to validate wiring and settings.",
    ],
  },
  {
    id: "wireshark-packet-sniffing",
    title: "Packet Sniffing with Wireshark",
    date: "March 2026",
    summary:
      "A starter workflow for captures, filters, and interpreting common protocol fields.",
    content: [
      "Wireshark is invaluable for seeing what’s actually happening on the wire.",
      "Begin with capture filters only when necessary; otherwise capture broadly and filter later.",
      "Learn a few key display filters like ip.addr, tcp.port, and dns to move faster.",
    ],
  },
];

export function getBlogPosts() {
  return blogPosts;
}

export function getBlogPostById(id) {
  return blogPosts.find((p) => p.id === id);
}
