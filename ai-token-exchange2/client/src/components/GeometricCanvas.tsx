/*
 * DESIGN PHILOSOPHY: Noir Precision + Generative Art
 * GeometricCanvas — REFINED VERSION
 * - Removed: shooting streaks, cyan/green ring color variation
 * - Kept: bright violet particle field, connecting lines, pulsing rings (violet only)
 * - Dot grid, mouse bloom, particle glow halos all retained
 */

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

const PARTICLE_COUNT = 110;
const CONNECTION_DISTANCE = 170;
const ACCENT = "124, 111, 255"; // #7C6FFF violet-blue only

export default function GeometricCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const tickRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initParticles = (w: number, h: number) => {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
        const r = Math.random();
        let px: number, py: number;
        if (r < 0.72) {
          px = w * 0.32 + Math.random() * w * 0.68;
          py = Math.random() * h * 0.78;
        } else {
          px = Math.random() * w;
          py = Math.random() * h;
        }
        return {
          x: px,
          y: py,
          vx: (Math.random() - 0.5) * 0.38,
          vy: (Math.random() - 0.5) * 0.38,
          radius: Math.random() * 2.2 + 0.7,
          opacity: Math.random() * 0.5 + 0.38,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.012 + Math.random() * 0.018,
        };
      });
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      tickRef.current++;
      const tick = tickRef.current;

      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      // ── Dot grid ──
      const gs = 34;
      for (let col = 0; col * gs <= w + gs; col++) {
        for (let row = 0; row * gs <= h + gs; row++) {
          const gx = col * gs;
          const gy = row * gs;
          const xFade = Math.min(1, Math.max(0, (gx - w * 0.04) / (w * 0.38)));
          const md = Math.hypot(gx - mouse.x, gy - mouse.y);
          const mGlow = md < 130 ? Math.pow(1 - md / 130, 1.5) * 0.7 : 0;
          const a = xFade * 0.13 + mGlow * xFade;
          if (a < 0.01) continue;
          const dotR = md < 130 ? 0.85 + (1 - md / 130) * 1.2 : 0.85;
          ctx.beginPath();
          ctx.arc(gx, gy, dotR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${ACCENT}, ${a})`;
          ctx.fill();
        }
      }

      // ── Update particles ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < -14) p.x = w + 14;
        if (p.x > w + 14) p.x = -14;
        if (p.y < -14) p.y = h + 14;
        if (p.y > h + 14) p.y = -14;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const md = Math.hypot(dx, dy);
        if (md < 100 && md > 0) {
          const f = ((100 - md) / 100) * 0.016;
          p.vx += (dx / md) * f;
          p.vy += (dy / md) * f;
        }

        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 0.7) {
          p.vx = (p.vx / spd) * 0.7;
          p.vy = (p.vy / spd) * 0.7;
        }
      }

      // ── Connecting lines ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist >= CONNECTION_DISTANCE) continue;
          const xFadeA = Math.min(1, Math.max(0, (a.x - w * 0.04) / (w * 0.36)));
          const xFadeB = Math.min(1, Math.max(0, (b.x - w * 0.04) / (w * 0.36)));
          const fade = Math.min(xFadeA, xFadeB);
          const la = (1 - dist / CONNECTION_DISTANCE) * 0.32 * fade;
          if (la < 0.01) continue;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${ACCENT}, ${la})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }

      // ── Particles with glow halos ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const xFade = Math.min(1, Math.max(0, (p.x - w * 0.04) / (w * 0.36)));
        const pulseBoost = 0.85 + Math.sin(p.pulse) * 0.15;
        const a = p.opacity * xFade * pulseBoost;
        if (a < 0.02) continue;

        const glowR = p.radius * 3.5;
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        glowGrad.addColorStop(0, `rgba(${ACCENT}, ${a * 0.45})`);
        glowGrad.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, ${Math.min(1, a * 1.4)})`;
        ctx.fill();
      }

      // ── Mouse bloom ──
      if (mouse.x > 0) {
        const mb = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        mb.addColorStop(0, `rgba(${ACCENT}, 0.07)`);
        mb.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
        ctx.fillStyle = mb;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
