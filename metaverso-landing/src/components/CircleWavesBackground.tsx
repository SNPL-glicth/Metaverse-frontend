import React, { useEffect, useRef, useState } from 'react';

interface Ring {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number; // px/s
  lineWidth: number;
  alpha: number;
}

// Fondo de círculos animados (sin puntos): ondas suaves que se expanden y desaparecen
// Minimalista en B/N, con generación automática y reacción al cursor
const CircleWavesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const ringsRef = useRef<Ring[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const config = {
    AUTO_SPAWN_EVERY: 0.9, // s
    MAX_RINGS: isMobile ? 20 : 40,
    BASE_MAX_RADIUS: isMobile ? 140 : 220,
    MIN_SPEED: 24,
    MAX_SPEED: 48,
    MIN_LINE: 0.6,
    MAX_LINE: 1.2,
    FADE: 0.35, // velocidad de desvanecimiento
    BG_ALPHA: 0.06,
  } as const;

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  };

  const spawnRing = (x?: number, y?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = x ?? Math.random() * canvas.width;
    const cy = y ?? Math.random() * canvas.height;
    const maxR = config.BASE_MAX_RADIUS * (0.7 + Math.random() * 0.6);
    const ring: Ring = {
      x: cx,
      y: cy,
      radius: 1,
      maxRadius: maxR,
      speed: config.MIN_SPEED + Math.random() * (config.MAX_SPEED - config.MIN_SPEED),
      lineWidth: config.MIN_LINE + Math.random() * (config.MAX_LINE - config.MIN_LINE),
      alpha: 0.55,
    };
    ringsRef.current.push(ring);
    if (ringsRef.current.length > config.MAX_RINGS) ringsRef.current.shift();
  };

  useEffect(() => {
    resizeCanvas();
    const onResize = () => resizeCanvas();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMobile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let last = performance.now();
    lastSpawnRef.current = last;

    const loop = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // leve fondo radial muy sutil
      ctx.fillStyle = `rgba(0,0,0,${config.BG_ALPHA})`;
      // no rellenamos todo para mantener limpio

      // auto-spawn
      if ((t - lastSpawnRef.current) / 1000 >= config.AUTO_SPAWN_EVERY) {
        spawnRing();
        lastSpawnRef.current = t;
      }

      // update & draw
      const rings = ringsRef.current;
      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.radius += r.speed * dt;
        r.alpha -= config.FADE * dt;
        if (r.radius >= r.maxRadius || r.alpha <= 0) {
          rings.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,0,0,${Math.max(0, r.alpha)})`;
        ctx.lineWidth = r.lineWidth;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      // Al mover el mouse, genera onditas suaves en la posición
      spawnRing(e.clientX - rect.left, e.clientY - rect.top);
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default CircleWavesBackground;
