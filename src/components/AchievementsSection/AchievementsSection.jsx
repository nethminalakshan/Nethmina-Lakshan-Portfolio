import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../AboutSection/AboutSection';

export default function AchievementsSection({ achievements, loading }) {
  if (!loading && (!achievements || achievements.length === 0)) return null;

  return (
    <section id="achievements" className="relative py-28 bg-surface overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mb-16 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display font-black text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
          >
            Awards & <span className="text-gradient">Achievements</span>
          </motion.h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-10">
             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan"></div>
          </div>
        ) : (
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {achievements.map((ach) => (
              <motion.div 
                key={ach.title} 
                variants={fadeUp}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-cyan/30 hover:glow-cyan transition-all duration-300 flex flex-col h-full"
              >
                {ach.imageUrl ? (
                  <div className="h-40 w-full mb-5 rounded-xl overflow-hidden bg-white/5 shrink-0">
                    <img src={ach.imageUrl} alt={ach.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan text-2xl mb-5 shrink-0">
                    🏆
                  </div>
                )}
                
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-display font-bold text-white text-lg">{ach.title}</h3>
                  {ach.year && <span className="text-xs font-bold bg-cyan/10 text-cyan px-2 py-1 rounded-md shrink-0">{ach.year}</span>}
                </div>
                
                {ach.organization && (
                  <p className="text-cyan/80 text-sm font-semibold mb-3">{ach.organization}</p>
                )}
                
                <p className="text-white/50 text-sm font-body leading-relaxed flex-1">
                  {ach.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
