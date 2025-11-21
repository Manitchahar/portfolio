
import React, { useEffect, useRef } from 'react';

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    const mouse = { x: -1000, y: -1000 };

    // Configuration
    const particleCount = Math.min(80, (w * h) / 18000); 
    const connectionDistance = 180;
    const mouseDistance = 300;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Mouse repulsion (Gentle push)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseDistance - distance) / mouseDistance;
          const repulsion = force * 1.5; 

          this.vx -= forceDirectionX * repulsion * 0.05;
          this.vy -= forceDirectionY * repulsion * 0.05;
        }
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(163, 230, 53, 0.3)'; 
        ctx!.fill();
      }
    }

    // Pulse representing data flow
    class Pulse {
      p1: Particle;
      p2: Particle;
      progress: number;
      speed: number;
      active: boolean;

      constructor(p1: Particle, p2: Particle) {
        this.p1 = p1;
        this.p2 = p2;
        this.progress = 0;
        this.speed = 0.02 + Math.random() * 0.03;
        this.active = true;
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) this.active = false;
      }

      draw() {
        const curX = this.p1.x + (this.p2.x - this.p1.x) * this.progress;
        const curY = this.p1.y + (this.p2.y - this.p1.y) * this.progress;
        
        ctx!.beginPath();
        ctx!.arc(curX, curY, 2, 0, Math.PI * 2);
        // Cyan pulse color for contrast against lime network
        ctx!.fillStyle = `rgba(34, 211, 238, ${1 - this.progress})`; 
        ctx!.shadowBlur = 10;
        ctx!.shadowColor = "rgba(34, 211, 238, 1)";
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let pulses: Pulse[] = [];

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Update & Draw Particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw Connections & Spawn Pulses
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(163, 230, 53, ${opacity * 0.15})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();

            // Randomly spawn a pulse
            if (Math.random() < 0.0005) {
              pulses.push(new Pulse(particles[i], particles[j]));
            }
          }
        }
      }

      // Update & Draw Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].update();
        if (!pulses[i].active) {
          pulses.splice(i, 1);
        } else {
          pulses[i].draw();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-[#0f0f11]"
    />
  );
};

export default BackgroundCanvas;
