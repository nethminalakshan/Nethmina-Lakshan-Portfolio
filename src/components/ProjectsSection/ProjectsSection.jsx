import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp, stagger } from '../AboutSection/AboutSection';

const ACCENT_COLORS = [
  { from: '#7c3aed', to: '#38bdf8' },
  { from: '#10b981', to: '#38bdf8' },
  { from: '#f59e0b', to: '#ec4899' },
  { from: '#ec4899', to: '#7c3aed' },
  { from: '#38bdf8', to: '#10b981' },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]),  { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]),  { stiffness: 200, damping: 20 });

  const colors = ACCENT_COLORS[index % ACCENT_COLORS.length];

  const onMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width  - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 800 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative group cursor-pointer h-full"
    >
      <div className="relative glass rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300 h-full flex flex-col">
        {/* Gradient top bar */}
        <div
          className="h-1.5 w-full"
          style={{ background: `linear-gradient(90deg, ${colors.from}, ${colors.to})` }}
        />

        {/* Card glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ boxShadow: `0 0 40px ${colors.from}33` }}
        />

        {/* Preview area */}
        <div
          className="h-48 flex items-center justify-center relative overflow-hidden group/img shrink-0"
          style={{ background: `linear-gradient(135deg, ${colors.from}15, ${colors.to}15)` }}
        >
          {project.imageUrl ? (
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
              loading="lazy"
            />
          ) : (
            <span
              className="font-display font-black text-6xl select-none opacity-20"
              style={{ color: colors.from }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
          {/* Floating icon-like shape overlay */}
          <div
            className="absolute top-4 right-4 w-8 h-8 rounded-xl opacity-80 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
          />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex justify-between items-start gap-4 mb-2">
            <h3 className="font-display font-bold text-white text-lg group-hover:text-gradient transition-all duration-300">
              {project.title}
            </h3>
            {project.year && (
              <span className="text-xs font-bold text-white/30 bg-white/5 px-2 py-1 rounded-md">
                {project.year}
              </span>
            )}
          </div>
          
          <p className="text-white/50 text-sm font-body leading-relaxed mb-5 line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Tech Tags */}
          {project.tech && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tech.map((t) => (
                <span key={t} className="px-2 py-0.5 text-xs rounded-md bg-white/5 text-white/50 border border-white/8">
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 mt-auto pt-2 border-t border-white/5">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="text-sm font-semibold text-white/50 hover:text-white transition-colors">
                GitHub ↗
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="text-sm font-semibold text-white/50 hover:text-cyan transition-colors">
                Live App ↗
              </a>
            )}
            {!project.github && !project.live && (
              <span className="text-sm font-semibold text-white/30">Details inside</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Projects Section ────────────────────────────────────────── */
export default function ProjectsSection({ projects, loading }) {
  return (
    <section id="projects" className="relative py-28 bg-surface overflow-hidden">
      {/* Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="text-accent font-display font-bold text-sm tracking-widest uppercase">02</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-accent/40 to-transparent" />
            <span className="text-white/30 text-sm font-body">Projects</span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-black text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
          >
            Things I've <span className="text-gradient">built</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/45 font-body mt-3 max-w-xl">
            A selection of projects spanning networking, embedded systems, and web development.
            (Managed directly via Google Drive).
          </motion.p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-20 glass rounded-2xl">
            <p className="text-white/50 mb-2">No projects found.</p>
            <p className="text-sm text-white/30">Upload to the "projects" folder in Drive!</p>
          </div>
        )}

        {/* Grid */}
        {!loading && projects.length > 0 && (
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            {projects.map((project, i) => (
              <motion.div key={project.title} variants={fadeUp} className="h-full">
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
