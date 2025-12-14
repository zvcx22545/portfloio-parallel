'use client';

import { useEffect, useRef } from 'react';

export default function GlobalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    
    // Resize on scroll (for dynamic content height changes)
    const resizeObserver = new ResizeObserver(() => {
      canvas.height = document.documentElement.scrollHeight;
    });
    resizeObserver.observe(document.body);
    
    window.addEventListener('resize', resize);

    // Particles for 3D effect
    const particles = [];
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 2 + 0.5,
        speedZ: Math.random() * 1.5 + 0.3,
        color: `hsl(${260 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`
      });
    }

    // Floating orbs throughout the page
    const orbs = [
      { x: 0.15, y: 0.1, radius: 350, color: 'rgba(139, 92, 246, 0.12)', speed: 0.015, offset: 0 },
      { x: 0.85, y: 0.15, radius: 280, color: 'rgba(34, 211, 238, 0.08)', speed: 0.012, offset: 2 },
      { x: 0.5, y: 0.25, radius: 400, color: 'rgba(236, 72, 153, 0.06)', speed: 0.008, offset: 4 },
      { x: 0.2, y: 0.4, radius: 300, color: 'rgba(34, 211, 238, 0.1)', speed: 0.01, offset: 1 },
      { x: 0.8, y: 0.5, radius: 350, color: 'rgba(139, 92, 246, 0.08)', speed: 0.013, offset: 3 },
      { x: 0.4, y: 0.65, radius: 320, color: 'rgba(236, 72, 153, 0.07)', speed: 0.011, offset: 5 },
      { x: 0.7, y: 0.75, radius: 280, color: 'rgba(139, 92, 246, 0.1)', speed: 0.009, offset: 2 },
      { x: 0.3, y: 0.85, radius: 350, color: 'rgba(34, 211, 238, 0.08)', speed: 0.014, offset: 4 },
    ];

    // Grid configuration
    const gridConfig = {
      lineColor: 'rgba(139, 92, 246, 0.03)',
      spacing: 80,
      perspective: true
    };

    const animate = () => {
      time += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw base gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, '#050510');
      bgGradient.addColorStop(0.2, '#0a0a1a');
      bgGradient.addColorStop(0.4, '#0f0f1f');
      bgGradient.addColorStop(0.6, '#0a0a1a');
      bgGradient.addColorStop(0.8, '#0f0f1f');
      bgGradient.addColorStop(1, '#050510');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw floating orbs with smooth movement
      orbs.forEach((orb, i) => {
        const baseX = orb.x * canvas.width;
        const baseY = orb.y * canvas.height;
        const x = baseX + Math.sin(time * orb.speed + orb.offset) * 120;
        const y = baseY + Math.cos(time * orb.speed * 0.8 + orb.offset * 1.5) * 100;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(0.5, orb.color.replace(/[\d.]+\)$/, `${parseFloat(orb.color.match(/[\d.]+\)$/)[0]) * 0.5})`));
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(x - orb.radius, y - orb.radius, orb.radius * 2, orb.radius * 2);
      });

      // Draw subtle grid pattern
      ctx.strokeStyle = gridConfig.lineColor;
      ctx.lineWidth = 0.5;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridConfig.spacing) {
        const wave = Math.sin(time * 0.5 + x * 0.01) * 3;
        ctx.beginPath();
        ctx.moveTo(x + wave, 0);
        ctx.lineTo(x + wave, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines with fade
      for (let y = 0; y < canvas.height; y += gridConfig.spacing) {
        const wave = Math.sin(time * 0.3 + y * 0.008) * 2;
        const alpha = 0.03 + Math.sin(time + y * 0.001) * 0.01;
        ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y + wave);
        ctx.lineTo(canvas.width, y + wave);
        ctx.stroke();
      }

      // Draw 3D flying particles
      particles.forEach(p => {
        p.z -= p.speedZ;
        if (p.z <= 0) {
          p.z = 1000;
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }
        
        const perspective = 300 / p.z;
        const screenX = (p.x - canvas.width / 2) * perspective + canvas.width / 2;
        const screenY = (p.y - canvas.height / 2) * perspective + canvas.height / 2;
        const size = Math.max(0.5, p.size * perspective);
        
        if (screenX > -50 && screenX < canvas.width + 50 && 
            screenY > -50 && screenY < canvas.height + 50) {
          const alpha = Math.min(0.8, (1000 - p.z) / 600);
          
          // Particle glow
          const glow = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, size * 3);
          glow.addColorStop(0, p.color.replace(')', `, ${alpha})`).replace('hsl', 'hsla'));
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.fillRect(screenX - size * 3, screenY - size * 3, size * 6, size * 6);
          
          // Core particle
          ctx.beginPath();
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace(')', `, ${alpha})`).replace('hsl', 'hsla');
          ctx.fill();
          
          // Trail
          if (alpha > 0.3) {
            ctx.beginPath();
            ctx.moveTo(screenX, screenY);
            const trailX = screenX + (screenX - canvas.width / 2) * 0.08;
            const trailY = screenY + (screenY - canvas.height / 2) * 0.08;
            ctx.lineTo(trailX, trailY);
            ctx.strokeStyle = p.color.replace(')', `, ${alpha * 0.3})`).replace('hsl', 'hsla');
            ctx.lineWidth = size * 0.5;
            ctx.stroke();
          }
        }
      });

      // Subtle scan lines
      for (let i = 0; i < 3; i++) {
        const scanY = ((time * 30 + i * 500) % canvas.height);
        const scanAlpha = 0.02 + Math.sin(time * 2 + i) * 0.01;
        ctx.fillStyle = `rgba(139, 92, 246, ${scanAlpha})`;
        ctx.fillRect(0, scanY - 1, canvas.width, 2);
      }

      // Vignette effect
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(0.7, 'transparent');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }} 
    />
  );
}
