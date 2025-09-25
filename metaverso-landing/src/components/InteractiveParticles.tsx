import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  connections: number[];
}

const InteractiveParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  // Configuración responsiva
  const [isMobile, setIsMobile] = useState(false);
  
  const config = {
    PARTICLE_COUNT: isMobile ? 100 : 200,
    MOUSE_RADIUS: isMobile ? 120 : 180,
    REPULSION_FORCE: 1.0,
    RETURN_FORCE: 0.025,
    CONNECTION_DISTANCE: isMobile ? 100 : 140,
    MAX_CONNECTIONS: isMobile ? 3 : 4
  };

  // Detectar dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Crear partículas iniciales
  const createParticles = (width: number, height: number): Particle[] => {
    const particles: Particle[] = [];
    
    for (let i = 0; i < config.PARTICLE_COUNT; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      particles.push({
        id: i,
        x,
        y,
        originalX: x,
        originalY: y,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        vx: 0,
        vy: 0,
        connections: []
      });
    }
    
    return particles;
  };

  // Calcular conexiones entre partículas
  const updateConnections = (particles: Particle[]) => {
    particles.forEach(particle => {
      particle.connections = [];
    });

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      let connectionCount = 0;

      for (let j = i + 1; j < particles.length; j++) {
        if (connectionCount >= config.MAX_CONNECTIONS) break;

        const other = particles[j];
        const distance = Math.sqrt(
          Math.pow(particle.x - other.x, 2) + Math.pow(particle.y - other.y, 2)
        );

        if (distance < config.CONNECTION_DISTANCE && other.connections.length < config.MAX_CONNECTIONS) {
          particle.connections.push(j);
          other.connections.push(i);
          connectionCount++;
        }
      }
    }
  };

  // Actualizar posiciones de partículas
  const updateParticles = (particles: Particle[], mouseX: number, mouseY: number) => {
    particles.forEach(particle => {
      // Calcular distancia al mouse
      const dx = particle.x - mouseX;
      const dy = particle.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Fuerza de repulsión del mouse
      if (distance < config.MOUSE_RADIUS && distance > 0) {
        const force = (config.MOUSE_RADIUS - distance) / config.MOUSE_RADIUS * config.REPULSION_FORCE;
        const angle = Math.atan2(dy, dx);
        particle.vx += Math.cos(angle) * force;
        particle.vy += Math.sin(angle) * force;
      }

      // Fuerza de retorno a posición original
      const returnDx = particle.originalX - particle.x;
      const returnDy = particle.originalY - particle.y;
      particle.vx += returnDx * config.RETURN_FORCE;
      particle.vy += returnDy * config.RETURN_FORCE;

      // Aplicar fricción
      particle.vx *= 0.95;
      particle.vy *= 0.95;

      // Actualizar posición
      particle.x += particle.vx;
      particle.y += particle.vy;
    });
  };

  // Dibujar en canvas
  const draw = (canvas: HTMLCanvasElement, particles: Particle[]) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar conexiones
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.lineWidth = 1;
    
    particles.forEach((particle, i) => {
      particle.connections.forEach(connectionIndex => {
        if (connectionIndex > i) { // Evitar duplicados
          const connected = particles[connectionIndex];
          const distance = Math.sqrt(
            Math.pow(particle.x - connected.x, 2) + Math.pow(particle.y - connected.y, 2)
          );
          
          const opacity = Math.max(0, (config.CONNECTION_DISTANCE - distance) / config.CONNECTION_DISTANCE) * 0.25;
          ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
          
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(connected.x, connected.y);
          ctx.stroke();
        }
      });
    });

    // Dibujar partículas
    particles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`;
      ctx.fill();
    });
  };

  // Loop de animación
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particles = particlesRef.current;
    
    updateParticles(particles, mouseRef.current.x, mouseRef.current.y);
    updateConnections(particles);
    draw(canvas, particles);

    animationRef.current = requestAnimationFrame(animate);
  };

  // Redimensionar canvas
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Recrear partículas con nuevas dimensiones
    particlesRef.current = createParticles(canvas.width, canvas.height);
  };

  // Manejar movimiento del mouse y touch
  const updateMousePosition = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Obtener posición relativa al canvas
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  // Manejar mouse global en toda la sección hero
  const handleGlobalMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Calcular posición del mouse relativa al canvas que cubre toda la sección
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Solo actualizar si el mouse está dentro de la sección hero
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      mouseRef.current = { x, y };
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    updateMousePosition(event.clientX, event.clientY);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      updateMousePosition(touch.clientX, touch.clientY);
    }
  };

  // Efectos
  useEffect(() => {
    resizeCanvas();
    animate();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    
    // Agregar listener global para mouse
    document.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
        style={{ cursor: 'default' }}
      />
    </div>
  );
};

export default InteractiveParticles;