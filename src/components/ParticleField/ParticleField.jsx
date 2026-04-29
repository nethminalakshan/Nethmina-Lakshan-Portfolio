import { useEffect, useRef } from "react";
import "./ParticleField.css";

// Antigravity-style: colored dots scattered across the page.
// When the cursor moves near a dot, it gets pushed away and
// then springs back to its home position.
export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let raf;
    let W, H;

    // ── Palette matching Antigravity screenshot ──────────────
    const COLORS = [
      "#4285F4", // Google blue
      "#EA4335", // Google red
      "#FBBC05", // Google yellow
      "#34A853", // Google green
      "#AB47BC", // purple
      "#FF7043", // orange
      "#26C6DA", // cyan
    ];

    // ── Config ───────────────────────────────────────────────
    const COUNT        = 180;   // number of dots
    const REPEL_RADIUS = 120;   // px — cursor influence radius
    const REPEL_FORCE  = 5.5;   // how hard dots are pushed away
    const RETURN_SPEED = 0.055; // spring back to home (lerp)
    const FRICTION     = 0.82;  // velocity damping
    const DOT_MIN      = 3;     // min radius px
    const DOT_MAX      = 6;     // max radius px

    let mouse = { x: -9999, y: -9999 };
    let particles = [];

    function rand(a, b) { return Math.random() * (b - a) + a; }

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < COUNT; i++) {
        const hx = rand(0, W);
        const hy = rand(0, H);
        particles.push({
          // home position
          hx, hy,
          // current position (starts at home)
          x: hx,
          y: hy,
          // velocity
          vx: 0,
          vy: 0,
          r: rand(DOT_MIN, DOT_MAX),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          opacity: rand(0.55, 1.0),
        });
      }
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        // ── Cursor repulsion ─────────────────────────────────
        const dx   = p.x - mouse.x;
        const dy   = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS && dist > 0) {
          // Stronger push the closer the cursor is
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          p.vx += (dx / dist) * force * REPEL_FORCE;
          p.vy += (dy / dist) * force * REPEL_FORCE;
        }

        // ── Spring back toward home ──────────────────────────
        p.vx += (p.hx - p.x) * RETURN_SPEED;
        p.vy += (p.hy - p.y) * RETURN_SPEED;

        // ── Apply friction ───────────────────────────────────
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        // ── Move ─────────────────────────────────────────────
        p.x += p.vx;
        p.y += p.vy;

        // ── Draw dot ─────────────────────────────────────────
        const speed   = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const glowing = speed > 0.5; // add glow when moving fast

        if (glowing) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur  = Math.min(speed * 3, 18);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + (glowing ? speed * 0.3 : 0), 0, Math.PI * 2);
        ctx.fillStyle = p.color
          .replace(")", `, ${p.opacity})`)
          .replace("rgb", "rgba");
        // hex fallback — just use full opacity with globalAlpha
        ctx.globalAlpha = p.opacity + (glowing ? Math.min(speed * 0.05, 0.3) : 0);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (glowing) {
          ctx.shadowBlur = 0;
        }
      }

      raf = requestAnimationFrame(draw);
    }

    // ── Init ─────────────────────────────────────────────────
    resize();
    initParticles();
    draw();

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", () => { resize(); initParticles(); });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      className="particleCanvas"
      ref={canvasRef}
      aria-hidden="true"
    />
  );
}
