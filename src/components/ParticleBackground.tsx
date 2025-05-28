import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Detect theme
  const getParticleColor = () => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000';
    }
    return '#000000';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        mousePosition.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Initialize particles
    const color = getParticleColor();
    particles.current = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 2.5,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
      color,
    }));

    const animate = () => {
      // Clear with the appropriate background color
      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#000000' : '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const color = getParticleColor();
      // Update and draw particles
      particles.current.forEach(particle => {
        // Calculate distance to mouse
        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        // Move particles towards mouse if they're within range
        if (distance < 250) {
          particle.x += dx * 0.03;
          particle.y += dy * 0.03;
        } else {
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.speedX *= -1;
          }
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.speedY *= -1;
          }
        }
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Connect particles close to mouse
        if (distance < 250) {
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.globalAlpha = 1 - distance / 250;
          ctx.lineWidth = 1.2;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mousePosition.current.x, mousePosition.current.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        // Connect nearby particles to each other
        particles.current.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.globalAlpha = 0.2 * (1 - distance / 120);
            ctx.lineWidth = 0.6;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });
      requestAnimationFrame(animate);
    };

    animate();

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const color = getParticleColor();
      particles.current.forEach(p => (p.color = color));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
};

export default ParticleBackground;
