"use client";

export default function Footer() {
  return (
    <footer className="bg-dark/40 backdrop-blur-md border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-white/70 text-sm font-body tracking-wide">
          Nethmina Lakshan
        </div>
        <p className="text-white/35 text-xs font-body tracking-wide">
          © {new Date().getFullYear()} · Built with React + Framer Motion
        </p>
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-xs font-body text-white/50 hover:text-white transition-colors duration-200 tracking-wide"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
