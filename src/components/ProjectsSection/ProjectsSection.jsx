"use client";

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { fadeUp, stagger } from '../AboutSection/AboutSection';
import PropTypes from 'prop-types';

const projectShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tech: PropTypes.arrayOf(PropTypes.string),
  github: PropTypes.string,
  live: PropTypes.string,
});

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]),  { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]),  { stiffness: 200, damping: 20 });

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
      <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-300 h-full flex flex-col">

        {/* Preview area */}
        <div className="h-48 flex items-center justify-center relative overflow-hidden group/img shrink-0 bg-white/5">
          {project.imageUrl ? (
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
              loading="lazy"
            />
          ) : (
            <span
              className="font-display font-semibold text-6xl select-none text-white/10"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex justify-between items-start gap-4 mb-2">
            <h3 className="font-display font-bold text-white text-lg transition-colors duration-300">
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

          <div className="flex items-center gap-4 mt-auto pt-2 border-t border-white/10">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="text-sm font-semibold text-white/55 hover:text-white transition-colors">
                GitHub ↗
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="text-sm font-semibold text-white/55 hover:text-white transition-colors">
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

ProjectCard.propTypes = {
  project: projectShape.isRequired,
  index: PropTypes.number.isRequired,
};

/* ── Projects Section ────────────────────────────────────────── */
export default function ProjectsSection({ projects, loading }) {
  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="text-white/60 font-body font-medium text-xs tracking-[0.25em] uppercase">02</span>
            <div className="h-px flex-1 max-w-xs bg-white/10" />
            <span className="text-white/35 text-xs font-body tracking-[0.25em] uppercase">Projects</span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-black text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
          >
            Things I've built
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/45 font-body mt-3 max-w-xl">
            A selection of projects spanning networking, embedded systems, and web development.
            (Managed directly via Google Drive).
          </motion.p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/40"></div>
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

ProjectsSection.propTypes = {
  projects: PropTypes.arrayOf(projectShape),
  loading: PropTypes.bool,
};

ProjectsSection.defaultProps = {
  projects: [],
  loading: false,
};
