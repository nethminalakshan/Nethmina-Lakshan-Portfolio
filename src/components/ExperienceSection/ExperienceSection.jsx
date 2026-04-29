import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../AboutSection/AboutSection';

export default function ExperienceSection({ experience, loading }) {
  if (!loading && (!experience || experience.length === 0)) return null;

  return (
    <section id="experience" className="relative py-28 bg-dark overflow-hidden">
      <div className="absolute left-0 top-1/3 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
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
            My <span className="text-gradient">Experience</span>
          </motion.h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-10">
             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : (
          <div className="relative border-l border-white/10 ml-4 md:ml-0 md:border-l-0">
            {/* Center line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
            
            <div className="space-y-12">
              {experience.map((exp, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div 
                    key={exp.title + i}
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Node on timeline */}
                    <div className="absolute -left-[5px] md:left-1/2 md:-translate-x-1/2 w-[10px] h-[10px] rounded-full bg-accent ring-4 ring-dark z-10" />

                    {/* Content Card */}
                    <div className="w-full md:w-1/2 flex pl-6 md:pl-0">
                      <div className={`glass p-6 rounded-2xl border border-white/5 w-full hover:border-accent/20 transition-all ${isEven ? 'md:mr-10' : 'md:ml-10'}`}>
                        {exp.imageUrl && (
                          <div className="h-32 w-full mb-4 rounded-xl overflow-hidden bg-white/5">
                            <img src={exp.imageUrl} alt={exp.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <span className="text-accent font-semibold text-sm mb-2 block">{exp.duration}</span>
                        <h3 className="font-display font-bold text-white text-xl mb-1">{exp.title}</h3>
                        <p className="text-white/60 font-medium text-sm mb-4">{exp.company}</p>
                        
                        <div className="text-white/50 text-sm font-body space-y-2 whitespace-pre-wrap">
                          {exp.description}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
