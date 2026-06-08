"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x:  number;
  y:  number;
  vx: number;
  vy: number;
  r:  number;
  o:  number;
}

export default function ParticleCanvas() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const particles   = useRef<Particle[]>([]);
  const mousePos    = useRef({ x: -9999, y: -9999 });
  const animFrameId = useRef<number>(0);
  const paused      = useRef(false);

  const initParticles = useCallback((w: number, h: number) => {
    particles.current = Array.from({ length: 80 }, () => ({
      x:  Math.random() * w,
      y:  Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.3,
      r:  1 + Math.random(),
      o:  0.1 + Math.random() * 0.3,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles(canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mousePos.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const onVisibility = () => { paused.current = document.hidden; };
    document.addEventListener("visibilitychange", onVisibility);

    const draw = () => {
      if (paused.current) { animFrameId.current = requestAnimationFrame(draw); return; }
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const ps = particles.current;
      const mx = mousePos.current.x, my = mousePos.current.y;

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];

        // Mouse repulsion
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150 * 0.6;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Dampen velocity
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2) { p.vx = (p.vx / speed) * 2; p.vy = (p.vy / speed) * 2; }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79,142,247,${p.o})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j];
          const ex = p.x - q.x, ey = p.y - q.y;
          const d  = Math.sqrt(ex * ex + ey * ey);
          if (d < 120) {
            const alpha = (1 - d / 120) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(79,142,247,${alpha})`;
            ctx.lineWidth   = 1;
            ctx.stroke();
          }
        }
      }

      animFrameId.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameId.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "absolute",
        inset:         0,
        width:         "100%",
        height:        "100%",
        zIndex:        0,
        pointerEvents: "none",
      }}
    />
  );
}
