import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);

    // Large, soft orbs
    const orbs = [
      { x: w * 0.2, y: h * 0.3, r: 400, color: 'rgba(196, 240, 66, 0.03)', vx: 0.5, vy: 0.3 }, // Lime
      { x: w * 0.8, y: h * 0.7, r: 500, color: 'rgba(168, 85, 247, 0.03)', vx: -0.3, vy: -0.2 }, // Purple
      { x: w * 0.5, y: h * 0.5, r: 300, color: 'rgba(34, 211, 238, 0.03)', vx: 0.2, vy: -0.4 }, // Cyan
    ];

    const render = () => {
      ctx.fillStyle = '#0f0f11'; // Clear with solid color
      ctx.fillRect(0, 0, w, h);

      // Apply blur via context filter for softness (modern browsers)
      ctx.filter = 'blur(80px)';

      orbs.forEach(orb => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.r || orb.x > w + orb.r) orb.vx *= -1;
        if (orb.y < -orb.r || orb.y > h + orb.r) orb.vy *= -1;

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = orb.color;
        ctx.fill();
      });

      ctx.filter = 'none'; // Reset filter
      requestAnimationFrame(render);
    };

    render();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default BackgroundCanvas;