'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar({ sections, onNavTo }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('hero');
  const email = 'nethminalakshan2018@gmail.com';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { root: null, rootMargin: '-35% 0px -55% 0px', threshold: [0.05, 0.12, 0.2, 0.35] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const compactLinks = useMemo(
    () => sections.filter((s) => s.id !== 'hero'),
    [sections]
  );

  const navTo = (id) => {
    setMenuOpen(false);
    onNavTo?.(id);
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={
        `fixed top-0 inset-x-0 z-50 transition-all duration-300 ` +
        (scrolled
          ? 'py-3 bg-dark/35 backdrop-blur-xl border-b border-white/5'
          : 'py-6 bg-transparent')
      }
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-white/90 font-body text-sm tracking-[0.12em] uppercase"
          aria-label="Go to top"
          onClick={(e) => {
            e.preventDefault();
            navTo('hero');
          }}
        >
          Nethmina Lakshan
        </Link>

        {/* Desktop sections */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {compactLinks.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => navTo(s.id)}
              className={
                'px-3 py-2 rounded-full text-[11px] tracking-[0.22em] uppercase font-body transition-colors ' +
                (activeId === s.id
                  ? 'text-white bg-white/6 border border-white/12'
                  : 'text-white/55 hover:text-white hover:bg-white/5')
              }
              aria-current={activeId === s.id ? 'page' : undefined}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${email}`}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber/30 text-white/90 hover:text-white hover:border-amber/45 hover:bg-white/5 transition-colors duration-200 text-[11px] tracking-[0.22em] uppercase font-body"
          >
            Let&apos;s talk
          </a>

          <button
            type="button"
            className="lg:hidden px-3 py-2 rounded-full border border-white/12 text-white/80 hover:text-white hover:border-white/20 hover:bg-white/5 transition-colors text-[11px] tracking-[0.22em] uppercase font-body"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="max-w-6xl mx-auto px-6 pb-5 pt-3">
              <div className="glass rounded-2xl p-4">
                <div className="grid grid-cols-2 gap-2">
                  {compactLinks.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => navTo(s.id)}
                      className={
                        'px-3 py-3 rounded-xl text-left text-[11px] tracking-[0.22em] uppercase font-body transition-colors ' +
                        (activeId === s.id
                          ? 'text-white bg-white/8 border border-white/12'
                          : 'text-white/60 hover:text-white hover:bg-white/6')
                      }
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <a
                  href={`mailto:${email}`}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-xl border border-amber/30 text-white/90 hover:text-white hover:border-amber/45 hover:bg-white/5 transition-colors duration-200 text-[11px] tracking-[0.22em] uppercase font-body"
                >
                  Let&apos;s talk
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

Navbar.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onNavTo: PropTypes.func,
};
