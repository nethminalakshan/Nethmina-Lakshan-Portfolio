"use client";

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../AboutSection/AboutSection';
import PropTypes from 'prop-types';

const SKILLS = [
  { category: 'Networking',       items: ['TCP/IP','Routing & Switching','Subnetting','Packet Tracer','Wireshark','VLANs','OSPF','BGP'] },
  { category: 'Embedded Systems', items: ['Arduino','STM32','Sensors','I2C / SPI','UART','FreeRTOS','PWM','ADC'] },
  { category: 'Programming',      items: ['C / C++','Python','JavaScript','TypeScript','React','Node.js','SQL','Bash'] },
  { category: 'Tools & DevOps',   items: ['Git','Docker','Linux','VS Code','Figma','Postman','Jenkins','AWS'] },
];

function SkillBubble({ skill, delay }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.1, y: -3 }}
      className="inline-flex px-3 py-1.5 rounded-xl text-sm font-semibold border border-white/10 bg-white/5 text-white/65 transition-colors duration-200 cursor-default hover:bg-white/8 hover:border-white/20"
    >
      {skill}
    </motion.span>
  );
}

SkillBubble.propTypes = {
  skill: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="text-white/60 font-body font-medium text-xs tracking-[0.25em] uppercase">03</span>
            <div className="h-px flex-1 max-w-xs bg-white/10" />
            <span className="text-white/35 text-xs font-body tracking-[0.25em] uppercase">Skills</span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-black text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
          >
            My toolkit
          </motion.h2>
        </motion.div>

        {/* Skill groups */}
        <div className="grid sm:grid-cols-2 gap-8">
          {SKILLS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ delay: gi * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <h3 className="font-body font-semibold text-white/80 text-xs tracking-[0.25em] uppercase">{group.category}</h3>
              </div>

              {/* Bubbles */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, si) => (
                  <SkillBubble
                    key={skill}
                    skill={skill}
                    delay={gi * 0.06 + si * 0.04}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
