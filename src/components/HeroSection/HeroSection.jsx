"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import gsap from 'gsap';

/* ── Typing role array ──────────────────────────────────────── */
const ROLES = ['Computer Engineer', 'Networking Enthusiast', 'Embedded Systems Dev', 'Full-Stack Developer'];

function TypingRole() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIdx];
    let timer;
    if (!deleting && displayed.length < target.length) {
      timer = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === target.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(target.slice(0, displayed.length - 1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, roleIdx]);

  return (
    <span className="text-white/80 font-semibold">
      {displayed}
      <span className="animate-pulse text-white/60">|</span>
    </span>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */
export default function HeroSection({ onPrimaryCta, onSecondaryCta }) {
  const contentRef = useRef(null);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const els = root.querySelectorAll('[data-hero-reveal]');
    if (!els.length) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(
      els,
      { opacity: 0, y: 14, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.08 }
    );

    return () => tl.kill();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24"
    >
      {/* subtle wash for readability */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/35 via-transparent to-black/45" />

      <div ref={contentRef} className="relative z-10 px-6 text-center">
        <h1
          data-hero-reveal
          className="font-display text-white/90 uppercase"
          style={{
            fontWeight: 700,
            letterSpacing: '0.28em',
            fontSize: 'clamp(1.4rem, 4.8vw, 3.3rem)',
          }}
        >
          Scroll to explore
        </h1>

        <p data-hero-reveal className="mt-6 text-white/50 font-body text-sm md:text-base tracking-wide">
          <TypingRole />
        </p>

        <p data-hero-reveal className="mt-3 max-w-2xl mx-auto text-white/40 font-body text-sm md:text-base leading-relaxed">
          Computer Engineering undergraduate focused on networking, embedded systems, and building practical software.
        </p>

        <div data-hero-reveal className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={onPrimaryCta}
            className="px-6 py-2.5 rounded-full border border-amber/35 text-white/90 hover:text-white hover:border-amber/55 hover:bg-white/5 transition-colors duration-200 text-xs tracking-[0.2em] uppercase font-body"
          >
            Projects
          </button>
          <button
            onClick={onSecondaryCta}
            className="px-6 py-2.5 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-colors duration-200 text-xs tracking-[0.2em] uppercase font-body"
          >
            About
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-body">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-0.5 h-10 bg-white/20 rounded-full"
        />
      </motion.div>
    </section>
  );
}

HeroSection.propTypes = {
  onPrimaryCta: PropTypes.func,
  onSecondaryCta: PropTypes.func,
};
