"use client";

import { motion } from 'framer-motion';

/* Shared scroll-reveal variants */
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const TAGS = ['C / C++', 'Python', 'JavaScript', 'React', 'Networking', 'Embedded', 'Linux', 'Docker'];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Subtle wash */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex items-center gap-3 mb-14"
        >
          <span className="text-white/60 font-body font-medium text-xs tracking-[0.25em] uppercase">01</span>
          <div className="h-px flex-1 max-w-xs bg-white/10" />
          <span className="text-white/35 text-xs font-body tracking-[0.25em] uppercase">About</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — avatar/visual */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
            variants={fadeLeft}
            className="relative"
          >
            {/* Avatar card */}
            <div className="relative inline-block">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden mx-auto flex items-center justify-center">
                <span className="font-display font-semibold text-7xl text-white/20 select-none tracking-tight">NL</span>
              </div>
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 px-3 py-1.5 bg-dark/40 backdrop-blur-md rounded-xl text-[11px] font-semibold text-white/70 border border-white/10"
              >
                🎓 Undergraduate
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 px-3 py-1.5 bg-dark/40 backdrop-blur-md rounded-xl text-[11px] font-semibold text-white/70 border border-white/10"
              >
                ⚡ Open to Work
              </motion.div>
            </div>
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="font-display font-black text-white mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
            >
              Passionate about building meaningful things
            </motion.h2>

            <motion.p variants={fadeUp} className="text-white/55 font-body leading-relaxed mb-4">
              I'm a Computer Engineering undergraduate specialising in networking
              and embedded systems. I enjoy working at the intersection of hardware
              and software — from configuring routers to writing full-stack web apps.
            </motion.p>

            <motion.p variants={fadeUp} className="text-white/55 font-body leading-relaxed mb-8">
              When I'm not coding, I'm exploring the latest in protocol design,
              tinkering with microcontrollers, or writing about what I learn.
            </motion.p>

            {/* Tag pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[11px] font-semibold rounded-lg border border-white/10 text-white/55 bg-white/5 hover:bg-white/8 hover:border-white/20 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
