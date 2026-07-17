import { useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

const SolarSystem = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let width, height;

    const stars = [];
    const STAR_COUNT = 250;

    // Each planet has dark-mode (color/glow) and light-mode (colorLight/glowLight) variants
    const planets = [
      { radius: 55,  size: 4.8, speed: 0.008,   color: 'rgba(230,130,30,0.9)',  glow: 'rgba(230,130,30,0.32)',  colorLight: 'rgba(190,110,30,0.95)', glowLight: 'rgba(190,110,30,0.3)',   rings: false },
      { radius: 90,  size: 6.6, speed: 0.005,   color: 'rgba(50,130,230,0.9)',  glow: 'rgba(50,130,230,0.3)',   colorLight: 'rgba(35,100,200,0.95)', glowLight: 'rgba(35,100,200,0.28)',  rings: false },
      { radius: 130, size: 7.2, speed: 0.003,   color: 'rgba(30,170,150,0.9)',  glow: 'rgba(30,170,150,0.28)',  colorLight: 'rgba(25,140,125,0.95)', glowLight: 'rgba(25,140,125,0.26)',  rings: false },
      { radius: 175, size: 6.6, speed: 0.002,   color: 'rgba(220,70,55,0.9)',   glow: 'rgba(220,70,55,0.28)',   colorLight: 'rgba(190,60,50,0.95)',  glowLight: 'rgba(190,60,50,0.26)',   rings: false },
      { radius: 230, size: 12,  speed: 0.0012,  color: 'rgba(190,150,90,0.9)',  glow: 'rgba(190,150,90,0.24)',  colorLight: 'rgba(150,115,60,0.9)',  glowLight: 'rgba(150,115,60,0.22)',  rings: false },
      { radius: 290, size: 9.6, speed: 0.0007,  color: 'rgba(210,170,70,0.9)',  glow: 'rgba(210,170,70,0.22)',  colorLight: 'rgba(175,140,50,0.9)',  glowLight: 'rgba(175,140,50,0.2)',   rings: true },
      { radius: 350, size: 8.4, speed: 0.00035, color: 'rgba(80,170,210,0.9)',  glow: 'rgba(80,170,210,0.22)',  colorLight: 'rgba(60,140,180,0.9)',  glowLight: 'rgba(60,140,180,0.2)',   rings: false },
      { radius: 410, size: 7.2, speed: 0.0002,   color: 'rgba(45,90,180,0.9)',   glow: 'rgba(45,90,180,0.2)',    colorLight: 'rgba(40,80,160,0.9)',   glowLight: 'rgba(40,80,160,0.18)',   rings: false },
    ];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.2 + 0.2,
          opacity: Math.random() * 0.5 + 0.15,
          twinkleSpeed: Math.random() * 0.015 + 0.003,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const onResize = () => { resize(); initStars(); };

    resize();
    initStars();
    window.addEventListener('resize', onResize);

    let time = 0;
    let paused = false;

    const onVisibilityChange = () => {
      paused = document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const getStarStyle = () => {
      const style = getComputedStyle(document.documentElement);
      return {
        color: style.getPropertyValue('--star-color').trim(),
        opacity: parseFloat(style.getPropertyValue('--star-opacity').trim()),
        orbit: style.getPropertyValue('--orbit-color').trim(),
      };
    };

    const draw = () => {
      if (paused) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, width, height);
      time += 1;

      const starStyle = getStarStyle();
      const isLight = themeRef.current === 'light';

      // Stars with twinkle
      for (const star of stars) {
        const flicker = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.35 + 0.65;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starStyle.color},${starStyle.opacity * flicker})`;
        ctx.fill();
      }

      const cx = width * 0.5;
      const cy = height * 0.55;

      // Sun outer glow
      const sunGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 192);
      sunGlow.addColorStop(0, isLight ? 'rgba(230,150,40,0.14)' : 'rgba(255,220,150,0.08)');
      sunGlow.addColorStop(0.4, isLight ? 'rgba(230,150,40,0.05)' : 'rgba(255,180,80,0.03)');
      sunGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 192, 0, Math.PI * 2);
      ctx.fillStyle = sunGlow;
      ctx.fill();

      // Sun inner glow
      const sunInner = ctx.createRadialGradient(cx, cy, 0, cx, cy, 38);
      sunInner.addColorStop(0, isLight ? 'rgba(235,160,50,0.4)' : 'rgba(255,230,180,0.25)');
      sunInner.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 38, 0, Math.PI * 2);
      ctx.fillStyle = sunInner;
      ctx.fill();

      // Sun core
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? 'rgba(235,160,50,0.9)' : 'rgba(255,240,200,0.6)';
      ctx.fill();

      const baseScale = Math.min(width, height) / 900;

      // Draw orbits and planets
      for (const planet of planets) {
        const r = planet.radius * baseScale;
        const planetColor = isLight ? planet.colorLight : planet.color;
        const planetGlow = isLight ? planet.glowLight : planet.glow;

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = starStyle.orbit;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        const angle = time * planet.speed;
        const px = cx + Math.cos(angle) * r;
        const py = cy + Math.sin(angle) * r;

        const glowR = planet.size * 4;
        const pGlow = ctx.createRadialGradient(px, py, 0, px, py, glowR);
        pGlow.addColorStop(0, planetGlow);
        pGlow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(px, py, glowR, 0, Math.PI * 2);
        ctx.fillStyle = pGlow;
        ctx.fill();

        const bodySize = planet.size * baseScale + 1;
        ctx.beginPath();
        ctx.arc(px, py, bodySize, 0, Math.PI * 2);
        ctx.fillStyle = planetColor;
        ctx.fill();

        if (planet.rings) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(0.3);
          ctx.beginPath();
          ctx.ellipse(0, 0, bodySize * 2.2, bodySize * 0.6, 0, 0, Math.PI * 2);
          ctx.strokeStyle = planetColor;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();
        }
      }

      // Shooting stars (dark mode only)
      if (themeRef.current === 'dark' && Math.random() < 0.002) {
        const sx = Math.random() * width * 0.8;
        const sy = Math.random() * height * 0.4;
        const len = Math.random() * 60 + 30;
        const ang = Math.PI / 4 + Math.random() * 0.4;
        const grad = ctx.createLinearGradient(sx, sy, sx + Math.cos(ang) * len, sy + Math.sin(ang) * len);
        grad.addColorStop(0, 'rgba(255,255,255,0.5)');
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + Math.cos(ang) * len, sy + Math.sin(ang) * len);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: 'none',
        background: 'var(--bg-dark)',
      }}
    />
  );
};

export default SolarSystem;