"use client";

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
    let W, H, DPR;

    // ── Config ───────────────────────────────────────────────
    const COUNT        = 520;   // number of dots
    const REPEL_RADIUS = 140;   // px — cursor influence radius
    const REPEL_FORCE  = 2.8;   // how hard dots are pushed away
    const RETURN_SPEED = 0.03;  // spring back to home (lerp)
    const FRICTION     = 0.88;  // velocity damping
    const DOT_MIN      = 0.8;   // min radius px
    const DOT_MAX      = 1.9;   // max radius px

    let mouse = { x: -9999, y: -9999 };
    let particles = [];

    function rand(a, b) { return Math.random() * (b - a) + a; }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      DPR = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width  = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
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
          opacity: rand(0.25, 0.95),
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

      // soft vignette (very subtle)
      const grad = ctx.createRadialGradient(W * 0.5, H * 0.55, 0, W * 0.5, H * 0.55, Math.max(W, H) * 0.7);
      grad.addColorStop(0, "rgba(255,255,255,0.02)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

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
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const glowing = speed > 0.35;

        ctx.shadowColor = "rgba(255,255,255,0.65)";
        ctx.shadowBlur  = glowing ? Math.min(speed * 10, 14) : 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + (glowing ? speed * 0.3 : 0), 0, Math.PI * 2);
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.globalAlpha = p.opacity + (glowing ? Math.min(speed * 0.12, 0.4) : 0);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(draw);
    }

    // ── Init ─────────────────────────────────────────────────
    resize();
    initParticles();
    draw();

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    const onResize = () => { resize(); initParticles(); };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
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
