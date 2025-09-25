import React, { useEffect, useRef, useState } from 'react';

interface Hub {
  x: number;
  y: number;
  ox: number; // posición original (para retorno)
  oy: number;
  vx: number;
  vy: number;
  radius: number; // distancia de la órbita
  nodeCount: number;
  baseAngle: number;
  speed: number; // rad/seg
  dir: number; // 1 o -1
  driftSpeed: number; // velocidad del movimiento orgánico
  driftPhase: number; // fase del movimiento orgánico
}

// Fondo orbital minimalista (blanco/negro) para diferenciarse del Hero
// - Hubs con nodos que orbitan
// - Líneas radiales y conexiones sutiles entre hubs
// - Parallax ligero con el mouse
const TechOrbitBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const hubsRef = useRef<Hub[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const config = {
    HUBS: isMobile ? 7 : 14,
    MIN_RADIUS: isMobile ? 26 : 42,
    MAX_RADIUS: isMobile ? 60 : 95,
    MIN_NODES: 6,
    MAX_NODES: 14,
    MIN_SPEED: 0.12, // deg/s
    MAX_SPEED: 0.5,  // deg/s
    PARALLAX: isMobile ? 6 : 12,
    BG_LINE_ALPHA: 0.09,
    HUB_LINKS: 3,
    REPULSE_RADIUS: isMobile ? 120 : 160,
    REPULSE_FORCE: 50,     // píxeles/seg^2
    RETURN_FORCE: 8,       // píxeles/seg^2 hacia origen
    FRICTION: 0.9,
    NODE_SIZE: 2,
    RADIUS_GROWTH: 0.3,
    DRIFT_FORCE: 6,     // fuerza suave de deriva orgánica
    NODE_REPULSE: 24,   // expansión adicional por nodo al acercar el cursor
  };

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const createHubs = (w: number, h: number): Hub[] => {
    const hubs: Hub[] = [];
    for (let i = 0; i < config.HUBS; i++) {
      const x = randomRange(w * 0.05, w * 0.95);
      const y = randomRange(h * 0.10, h * 0.90);
      hubs.push({
        x,
        y,
        ox: x,
        oy: y,
        vx: 0,
        vy: 0,
        radius: randomRange(config.MIN_RADIUS, config.MAX_RADIUS),
        nodeCount: Math.floor(randomRange(config.MIN_NODES, config.MAX_NODES + 1)),
        baseAngle: randomRange(0, Math.PI * 2),
        speed: toRad(randomRange(config.MIN_SPEED, config.MAX_SPEED)),
        dir: Math.random() < 0.5 ? -1 : 1,
        driftSpeed: randomRange(0.6, 1.4),
        driftPhase: randomRange(0, Math.PI * 2),
      });
    }
    return hubs;
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    hubsRef.current = createHubs(canvas.width, canvas.height);
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

    let lastTime = performance.now();

    const draw = (t: number) => {
      const now = t;
      const dt = (now - lastTime) / 1000; // seg
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Parallax ligero
      const px = ((mouseRef.current.x / canvas.width) - 0.5) * config.PARALLAX;
      const py = ((mouseRef.current.y / canvas.height) - 0.5) * config.PARALLAX;

      // Actualizar ángulos base y dibujar
      const hubs = hubsRef.current;
      const tsec = now / 1000;

      // Conexiones sutiles entre hubs cercanos
      ctx.lineWidth = 1;
      for (let i = 0; i < hubs.length; i++) {
        for (let j = i + 1; j < Math.min(i + 1 + config.HUB_LINKS, hubs.length); j++) {
          const a = hubs[i];
          const b = hubs[j];
          const dx = (a.x - b.x);
          const dy = (a.y - b.y);
          const dist = Math.hypot(dx, dy);
          const alpha = Math.max(0, 0.14 - dist / (canvas.width * 1.6));
          if (alpha > 0.02) {
            ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x + px, a.y + py);
            ctx.lineTo(b.x + px, b.y + py);
            ctx.stroke();
          }
        }
      }

      hubs.forEach(hub => {
        // Repulsión del cursor sobre el HUB
        const dx = hub.x - mouseRef.current.x;
        const dy = hub.y - mouseRef.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 0 && dist < config.REPULSE_RADIUS) {
          const force = (config.REPULSE_RADIUS - dist) / config.REPULSE_RADIUS * config.REPULSE_FORCE;
          const ang = Math.atan2(dy, dx);
          hub.vx += Math.cos(ang) * force * dt;
          hub.vy += Math.sin(ang) * force * dt;
        }

        // Retorno a posición original + fricción
        hub.vx += (hub.ox - hub.x) * config.RETURN_FORCE * dt;
        hub.vy += (hub.oy - hub.y) * config.RETURN_FORCE * dt;

        // Deriva orgánica permanente (hace que se muevan solos)
        hub.vx += Math.cos(tsec * hub.driftSpeed + hub.driftPhase) * config.DRIFT_FORCE * dt;
        hub.vy += Math.sin(tsec * hub.driftSpeed + hub.driftPhase * 1.5) * config.DRIFT_FORCE * dt;

        hub.vx *= config.FRICTION;
        hub.vy *= config.FRICTION;

        // Actualizar posición
        hub.x += hub.vx * dt;
        hub.y += hub.vy * dt;

        // Rotación (alterna dirección por hub)
        hub.baseAngle += hub.dir * hub.speed * dt;

        // Radio dinámico cuando el mouse está cerca (empuja nodos hacia afuera)
        const growth = dist < config.REPULSE_RADIUS ?
          1 + config.RADIUS_GROWTH * (config.REPULSE_RADIUS - dist) / config.REPULSE_RADIUS : 1;
        const dynamicRadius = hub.radius * growth;

        // Dibujar líneas radiales y nodos orbitando
        for (let i = 0; i < hub.nodeCount; i++) {
          const angle = hub.baseAngle + (i * (Math.PI * 2)) / hub.nodeCount;
          let nx = hub.x + Math.cos(angle) * dynamicRadius;
          let ny = hub.y + Math.sin(angle) * dynamicRadius;

          // Repulsión por nodo respecto al cursor (expande la órbita localmente)
          const ndx = nx - mouseRef.current.x;
          const ndy = ny - mouseRef.current.y;
          const ndist = Math.hypot(ndx, ndy);
          if (ndist < config.REPULSE_RADIUS) {
            const boost = (config.REPULSE_RADIUS - ndist) / config.REPULSE_RADIUS;
            const extra = config.NODE_REPULSE * boost;
            nx += Math.cos(angle) * extra;
            ny += Math.sin(angle) * extra;
          }

          // Línea radial
          ctx.strokeStyle = `rgba(0,0,0,${config.BG_LINE_ALPHA})`;
          ctx.beginPath();
          ctx.moveTo(hub.x + px, hub.y + py);
          ctx.lineTo(nx + px, ny + py);
          ctx.stroke();

          // Nodo (pequeño círculo)
          ctx.beginPath();
          ctx.arc(nx + px, ny + py, config.NODE_SIZE, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,0,0,0.35)';
          ctx.fill();
        }

        // Hub central sutil
        ctx.beginPath();
        ctx.arc(hub.x + px, hub.y + py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fill();
      });
    };

    const loop = (t: number) => {
      draw(t);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [config.PARALLAX, config.BG_LINE_ALPHA]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
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

export default TechOrbitBackground;
