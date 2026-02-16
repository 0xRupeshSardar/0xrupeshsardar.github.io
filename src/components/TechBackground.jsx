import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getRandomPayload } from '../data/securityPayloads';

const TechBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Initialize particles with random positions
    const initialParticles = [...Array(40)].map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 30 + 20,
    }));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Multi-layer Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-blue-50/30 to-zinc-100 dark:from-zinc-950 dark:via-blue-950/20 dark:to-zinc-900" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary-50/10 to-transparent dark:from-transparent dark:via-primary-950/10 dark:to-transparent" />
      
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Hexagonal Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Grid Pattern - Multiple Layers */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Matrix Code Rain Effect - Enhanced with Security Content */}
      <div className="absolute inset-0 overflow-hidden opacity-40 dark:opacity-30">
        {[...Array(30)].map((_, i) => {
          // Calculate evenly distributed horizontal position
          const columnWidth = 100 / 30; // Divide screen into 30 equal columns
          const leftPosition = i * columnWidth;

          return (
            <motion.div
              key={`matrix-${i}`}
              className="absolute text-[11px] font-mono whitespace-nowrap select-none"
              style={{
                left: `${leftPosition}%`,
                color: i % 4 === 0 
                  ? '#00aa22' // Darker matrix green
                  : i % 4 === 1
                  ? '#aaaaaa' // Darker white (gray)
                  : i % 4 === 2
                  ? '#aa0000' // Darker red for exploits
                  : '#0088aa', // Darker cyan for commands
                textShadow: '0 0 8px currentColor',
                fontWeight: i % 3 === 0 ? 600 : 400,
                transform: 'translateX(-50%)', // Center the column on its position
              }}
              initial={{ 
                y: -200 - Math.random() * 300,
              }}
              animate={{ 
                y: '120vh',
              }}
              transition={{
                duration: Math.random() * 6 + 10,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 8,
              }}
            >
              <div className="flex flex-col gap-0.5">
                {Array(Math.floor(Math.random() * 4) + 2).fill(0).map((_, idx) => (
                  <div key={idx} className="opacity-90">
                    {getRandomPayload()}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Particles with varied sizes */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary-500/20 dark:bg-primary-400/30"
          style={{
            width: particle.size,
            height: particle.size,
          }}
          initial={{
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            x: [particle.x, Math.random() * window.innerWidth, particle.x],
            y: [particle.y, Math.random() * window.innerHeight, particle.y],
          }}
          transition={{
            duration: particle.speed,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Circuit Board Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]">
        {[...Array(8)].map((_, i) => (
          <g key={`circuit-${i}`}>
            <motion.path
              d={`M ${i * 150} 0 L ${i * 150} ${window.innerHeight} M 0 ${i * 100} L ${window.innerWidth} ${i * 100}`}
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2, delay: i * 0.2 },
                opacity: { duration: 0.5, delay: i * 0.2 },
              }}
            />
            {/* Circuit nodes */}
            <motion.circle
              cx={i * 150}
              cy={i * 100}
              r="3"
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{
                duration: 1,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 5,
              }}
            />
          </g>
        ))}
      </svg>

      {/* Glow Orbs - Enhanced */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-primary-500/15 dark:bg-primary-400/15 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * 120,
          y: mousePosition.y * 120,
          scale: [1, 1.2, 1],
        }}
        style={{
          left: '15%',
          top: '25%',
        }}
        transition={{ 
          x: { type: 'spring', stiffness: 50, damping: 30 },
          y: { type: 'spring', stiffness: 50, damping: 30 },
          scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }}
      />
      
      <motion.div
        className="absolute w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-3xl"
        animate={{
          x: -mousePosition.x * 100,
          y: -mousePosition.y * 100,
          scale: [1, 1.1, 1],
        }}
        style={{
          right: '15%',
          bottom: '25%',
        }}
        transition={{ 
          x: { type: 'spring', stiffness: 40, damping: 30 },
          y: { type: 'spring', stiffness: 40, damping: 30 },
          scale: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-400/10 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * 60,
          y: -mousePosition.y * 60,
          scale: [1, 1.15, 1],
        }}
        style={{
          left: '50%',
          top: '50%',
        }}
        transition={{ 
          x: { type: 'spring', stiffness: 45, damping: 30 },
          y: { type: 'spring', stiffness: 45, damping: 30 },
          scale: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }
        }}
      />

      {/* Animated Geometric Shapes */}
      <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-5">
        {/* Animated Diagonal Lines */}
        <motion.line
          x1="0"
          y1="0"
          x2="100%"
          y2="100%"
          stroke="url(#gradient1)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.line
          x1="100%"
          y1="0"
          x2="0"
          y2="100%"
          stroke="url(#gradient2)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
        />
        
        {/* Animated Circles */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={`circle-${i}`}
            cx={`${20 + i * 20}%`}
            cy={`${30 + i * 10}%`}
            r="50"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Scan Line Effect */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Digital Noise Effect - Enhanced */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay">
        <div className="absolute inset-0 animate-pulse" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Spotlight Effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />
    </div>
  );
};

export default TechBackground;
