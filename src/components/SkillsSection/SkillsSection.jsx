import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../AboutSection/AboutSection';

const SKILLS = [
  { category: 'Networking',       color: '#7c3aed', items: ['TCP/IP','Routing & Switching','Subnetting','Packet Tracer','Wireshark','VLANs','OSPF','BGP'] },
  { category: 'Embedded Systems', color: '#10b981', items: ['Arduino','STM32','Sensors','I2C / SPI','UART','FreeRTOS','PWM','ADC'] },
  { category: 'Programming',      color: '#38bdf8', items: ['C / C++','Python','JavaScript','TypeScript','React','Node.js','SQL','Bash'] },
  { category: 'Tools & DevOps',   color: '#f59e0b', items: ['Git','Docker','Linux','VS Code','Figma','Postman','Jenkins','AWS'] },
];

function SkillBubble({ skill, color, delay }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.1, y: -3 }}
      className="inline-flex px-3 py-1.5 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-default"
      style={{
        color,
        borderColor: `${color}30`,
        backgroundColor: `${color}0d`,
      }}
    >
      {skill}
    </motion.span>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-28 bg-dark overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-48 bg-accent/6 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="text-accent font-display font-bold text-sm tracking-widest uppercase">03</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-accent/40 to-transparent" />
            <span className="text-white/30 text-sm font-body">Skills</span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-black text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
          >
            My <span className="text-gradient">toolkit</span>
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
              className="glass rounded-2xl p-6"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-8 rounded-full" style={{ backgroundColor: group.color }} />
                <h3 className="font-display font-bold text-white text-base">{group.category}</h3>
              </div>

              {/* Bubbles */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, si) => (
                  <SkillBubble
                    key={skill}
                    skill={skill}
                    color={group.color}
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
