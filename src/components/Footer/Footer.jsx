export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-cyan flex items-center justify-center font-display font-black text-white text-xs">
            N
          </div>
          <span className="font-display font-semibold text-white/70 text-sm">Nethmina Lakshan</span>
        </div>
        <p className="text-white/30 text-xs font-body">
          © {new Date().getFullYear()} · Built with React + Framer Motion
        </p>
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-xs font-body text-accent/70 hover:text-accent transition-colors duration-200"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
