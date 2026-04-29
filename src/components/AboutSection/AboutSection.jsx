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
    <section id="about" className="relative py-28 bg-dark overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-accent/8 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex items-center gap-3 mb-14"
        >
          <span className="text-accent font-display font-bold text-sm tracking-widest uppercase">01</span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-accent/40 to-transparent" />
          <span className="text-white/30 text-sm font-body">About Me</span>
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
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl glass glow-sm overflow-hidden mx-auto">
                <div className="w-full h-full bg-gradient-to-br from-accent/20 via-surface to-cyan/20 flex items-center justify-center">
                  <span className="font-display font-black text-8xl text-gradient select-none">NL</span>
                </div>
              </div>
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 px-3 py-1.5 glass rounded-xl text-xs font-semibold text-emerald border border-emerald/30"
              >
                🎓 Undergraduate
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 px-3 py-1.5 glass rounded-xl text-xs font-semibold text-cyan border border-cyan/30"
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
              Passionate about building{' '}
              <span className="text-gradient">meaningful things</span>
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
                  className="px-3 py-1 text-xs font-semibold rounded-lg border border-accent/20 text-accent/80 bg-accent/5 hover:bg-accent/10 hover:border-accent/40 transition-all duration-200"
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
