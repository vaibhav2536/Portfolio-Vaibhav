import React, { useEffect, useRef } from 'react';

/**
 * Layered animated wallpaper:
 *  1. drifting aurora blobs (CSS)
 *  2. interactive constellation canvas that reacts to the cursor
 *  3. perspective grid fading into the horizon
 *  4. cursor spotlight + film grain
 */
const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    let particles: P[] = [];

    const hues = [265, 290, 190]; // violet, fuchsia, cyan

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, (width * height) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.4,
        hue: hues[Math.floor(Math.random() * hues.length)],
      }));
    };

    const linkDist = 130;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // gentle pull towards the cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 200 * 200) {
          const f = 0.00004 * (200 - Math.sqrt(d2));
          p.vx += dx * f;
          p.vy += dy * f;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        // keep a minimum drift
        if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.02;
        if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.02;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            ctx.strokeStyle = `hsla(${a.hue}, 90%, 70%, ${(1 - d / linkDist) * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // links to the cursor
        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 170) {
          ctx.strokeStyle = `hsla(${a.hue}, 95%, 75%, ${(1 - md / 170) * 0.45})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 95%, 78%, 0.85)`;
        ctx.shadowColor = `hsla(${p.hue}, 95%, 65%, 1)`;
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
      }
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    init();
    draw();
    window.addEventListener('resize', init);
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', init);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-ink-950" style={{ zIndex: 0 }}>
      {/* Aurora blobs */}
      <div className="absolute -left-[10%] -top-[20%] h-[70vmax] w-[70vmax] rounded-full bg-violet-700/30 blur-[120px] animate-[aurora1_22s_ease-in-out_infinite]" />
      <div className="absolute -right-[15%] top-[10%] h-[60vmax] w-[60vmax] rounded-full bg-fuchsia-600/20 blur-[130px] animate-[aurora2_26s_ease-in-out_infinite]" />
      <div className="absolute -bottom-[30%] left-[20%] h-[60vmax] w-[60vmax] rounded-full bg-cyan-500/20 blur-[140px] animate-[aurora3_30s_ease-in-out_infinite]" />

      {/* Perspective grid */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55vh] opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(167,139,250,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.25) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          transform: 'perspective(500px) rotateX(62deg)',
          transformOrigin: 'bottom',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent 85%)',
        }}
      />

      {/* Constellation */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Cursor spotlight */}
      <div
        ref={spotlightRef}
        className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(167,139,250,0.14) 0%, rgba(34,211,238,0.06) 35%, transparent 65%)',
          transform: 'translate3d(-9999px, -9999px, 0)',
        }}
      />

      {/* Vignette + grain */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 0%, rgba(5,4,10,0.55) 70%, rgba(5,4,10,0.9) 100%)' }}
      />
      <div className="noise absolute inset-0" />

      <style>{`
        @keyframes aurora1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(15vw, 10vh) scale(1.15); } }
        @keyframes aurora2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-12vw, 15vh) scale(0.9); } }
        @keyframes aurora3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(10vw, -12vh) scale(1.1); } }
      `}</style>
    </div>
  );
};

export default Background;
