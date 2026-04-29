import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* ── Floating particle dots (Antigravity-style) ─────────────── */
const DOTS = [
  { id:1,  x:8,  y:18, r:10, color:'#7c3aed', depth:0.6, dur:5.2 },
  { id:2,  x:88, y:12, r:6,  color:'#38bdf8', depth:0.35,dur:6.8 },
  { id:3,  x:78, y:75, r:14, color:'#f59e0b', depth:0.7, dur:4.8 },
  { id:4,  x:18, y:80, r:8,  color:'#10b981', depth:0.3, dur:7.2 },
  { id:5,  x:52, y:90, r:5,  color:'#ec4899', depth:0.5, dur:5.8 },
  { id:6,  x:93, y:48, r:12, color:'#7c3aed', depth:0.8, dur:4.4 },
  { id:7,  x:4,  y:55, r:7,  color:'#38bdf8', depth:0.4, dur:6.2 },
  { id:8,  x:65, y:22, r:9,  color:'#f59e0b', depth:0.55,dur:5.5 },
  { id:9,  x:35, y:8,  r:11, color:'#10b981', depth:0.3, dur:7.8 },
  { id:10, x:72, y:60, r:6,  color:'#ec4899', depth:0.65,dur:5.0 },
  { id:11, x:28, y:45, r:8,  color:'#7c3aed', depth:0.45,dur:6.5 },
  { id:12, x:48, y:68, r:4,  color:'#38bdf8', depth:0.7, dur:4.6 },
  { id:13, x:82, y:88, r:7,  color:'#f59e0b', depth:0.5, dur:7.0 },
  { id:14, x:15, y:30, r:13, color:'#10b981', depth:0.25,dur:8.2 },
  { id:15, x:60, y:5,  r:6,  color:'#ec4899', depth:0.6, dur:5.4 },
  { id:16, x:40, y:82, r:9,  color:'#7c3aed', depth:0.4, dur:6.0 },
  { id:17, x:95, y:25, r:5,  color:'#38bdf8', depth:0.55,dur:5.7 },
  { id:18, x:22, y:65, r:10, color:'#f59e0b', depth:0.75,dur:4.2 },
  { id:19, x:55, y:38, r:7,  color:'#10b981', depth:0.35,dur:7.5 },
  { id:20, x:70, y:92, r:8,  color:'#ec4899', depth:0.5, dur:5.1 },
];

/* Per-dot component so hooks are called at component level */
function FloatDot({ dot, mouseX, mouseY }) {
  const ox = useTransform(mouseX, [-0.5, 0.5], [-dot.depth * 35, dot.depth * 35]);
  const oy = useTransform(mouseY, [-0.5, 0.5], [-dot.depth * 35, dot.depth * 35]);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${dot.x}%`,
        top:  `${dot.y}%`,
        width:  dot.r * 2,
        height: dot.r * 2,
        backgroundColor: dot.color,
        boxShadow: `0 0 ${dot.r * 2}px ${dot.color}88`,
        x: ox,
        y: oy,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale:   [1, 1.12, 1],
        opacity: [0.7, 1,   0.7],
        y:       [0, -(dot.r * 1.4), 0],
      }}
      transition={{
        duration: dot.dur,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: dot.id * 0.18,
      }}
    />
  );
}

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
    <span className="text-gradient font-semibold">
      {displayed}
      <span className="animate-pulse text-accent">|</span>
    </span>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(rawY, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    rawX.set((e.clientX - left) / width - 0.5);
    rawY.set((e.clientY - top)  / height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  /* Stagger for text blocks */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-dark"
    >
      {/* Radial glow bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-cyan/8  rounded-full blur-[100px]" />
      </div>

      {/* Floating dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {DOTS.map((dot) => (
          <FloatDot key={dot.id} dot={dot} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={item} className="inline-flex items-center gap-2 mb-6">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold border border-accent/30 text-accent/90 bg-accent/5 backdrop-blur-sm tracking-widest uppercase">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-display font-black text-white leading-none mb-4"
          style={{ fontSize: 'clamp(3rem, 9vw, 7rem)', letterSpacing: '-0.04em' }}
        >
          Nethmina{' '}
          <span className="text-gradient">Lakshan</span>
        </motion.h1>

        {/* Typing role */}
        <motion.p
          variants={item}
          className="text-xl md:text-2xl text-white/50 mb-8 h-8 font-body"
        >
          <TypingRole />
        </motion.p>

        {/* Description */}
        <motion.p
          variants={item}
          className="max-w-xl mx-auto text-white/50 font-body leading-relaxed mb-10 text-base md:text-lg"
        >
          Computer Engineering undergraduate passionate about networking,
          embedded systems, and building software that matters.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-8 py-4 bg-accent text-white font-semibold rounded-2xl text-base transition-all duration-300 hover:bg-accentL glow-sm hover:glow-accent hover:-translate-y-1 relative overflow-hidden"
          >
            <span className="relative z-10">View Projects →</span>
            {/* Shimmer */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-2xl text-base font-semibold text-white/80 hover:text-white border border-white/10 hover:border-accent/40 bg-white/5 hover:bg-white/8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
          >
            Get in Touch
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30"
      >
        <span className="text-xs tracking-widest uppercase font-body">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-0.5 h-8 bg-gradient-to-b from-white/30 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
