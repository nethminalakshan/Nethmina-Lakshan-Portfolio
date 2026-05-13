"use client";

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../AboutSection/AboutSection';

const TESTIMONIALS = [
  {
    quote:
      'Nethmina consistently delivers clean, dependable work and communicates clearly throughout the process.',
    name: 'Peer collaborator',
    title: 'Team Project',
  },
  {
    quote:
      'Strong engineering fundamentals with a practical mindset — especially around networking and systems thinking.',
    name: 'Mentor',
    title: 'Academic',
  },
  {
    quote:
      'Fast learner, detail-oriented, and reliable under deadlines. A great teammate to build with.',
    name: 'Teammate',
    title: 'Hackathon',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="text-white/60 font-body font-medium text-xs tracking-[0.25em] uppercase">06</span>
            <div className="h-px flex-1 max-w-xs bg-white/10" />
            <span className="text-white/35 text-xs font-body tracking-[0.25em] uppercase">Testimonials</span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-black text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
          >
            Trusted to deliver
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/45 font-body mt-3 max-w-xl">
            Social proof in a clean, cinematic layout.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="grid md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.quote}
              variants={fadeUp}
              className="glass rounded-2xl p-6"
            >
              <blockquote className="text-white/70 font-body leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 pt-5 border-t border-white/10">
                <div className="text-white font-display font-semibold tracking-wide">
                  {t.name}
                </div>
                <div className="text-white/45 text-sm font-body">
                  {t.title}
                </div>
                <div className="mt-4 h-px w-12 bg-amber/60" aria-hidden="true" />
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
