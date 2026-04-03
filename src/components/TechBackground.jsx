import { motion } from 'framer-motion';
import { useMemo } from 'react';

const TechBackground = () => {
  const petals = useMemo(
    () =>
      [...Array(12)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        startY: -10 - Math.random() * 15,
        size: 6 + Math.random() * 8,
        duration: 18 + Math.random() * 15,
        delay: Math.random() * 12,
        swing: (Math.random() - 0.5) * 30,
      })),
    []
  );

  const sparkles = useMemo(
    () =>
      [...Array(25)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1.5 + Math.random() * 2,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 3,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Anime sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-violet-50/40 to-pink-100/60 dark:from-indigo-950 dark:via-violet-950/60 dark:to-zinc-950" />

      {/* Tech accent glow */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 20% 10%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 80% 20%, rgba(34, 211, 238, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 40% 40% at 50% 90%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
          `,
        }}
      />
      <div
        className="absolute inset-0 dark:opacity-100 opacity-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 30% at 15% 15%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse 40% 25% at 85% 80%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)
          `,
        }}
      />

      {/* Tech grid */}
      <div
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(99,102,241) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(99,102,241) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Circuit hexagons */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M16 0l14 8v16l-14 8-14-8V8z' fill='none' stroke='%236366f1' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Cherry blossom petals */}
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.startY}%`,
            width: p.size,
            height: p.size * 1.3,
            background: 'rgba(251, 207, 232, 0.6)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            transform: `rotate(${p.swing}deg)`,
          }}
          animate={{
            y: ['0vh', '115vh'],
            x: [0, p.swing * 2, 0],
            rotate: [p.swing, p.swing + 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: p.delay,
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white dark:bg-cyan-200/70"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: `0 0 ${p.size * 2}px 1px rgba(255,255,255,0.8)`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}

      {/* Floating tech nodes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute rounded-full border border-violet-400/30 dark:border-cyan-400/20"
          style={{
            width: 60 + i * 30,
            height: 60 + i * 30,
            left: `${10 + (i % 3) * 35}%`,
            top: `${15 + Math.floor(i / 3) * 45}%`,
          }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.03) 100%)',
        }}
      />
      <div
        className="absolute inset-0 dark:block hidden"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.15) 100%)',
        }}
      />
    </div>
  );
};

export default TechBackground;
