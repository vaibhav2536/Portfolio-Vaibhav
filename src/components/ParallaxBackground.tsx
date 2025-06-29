import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParallaxBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Responsive floating elements
  const floatingElements = Array.from({ length: window.innerWidth < 768 ? 8 : 15 }, (_, i) => ({
    id: i,
    size: Math.random() * (window.innerWidth < 768 ? 80 : 120) + (window.innerWidth < 768 ? 30 : 40),
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    speed: (Math.random() * 0.8 + 0.1) * (i % 2 === 0 ? 1 : -1),
    opacity: Math.random() * 0.15 + 0.03,
    blur: Math.random() * 4 + 1,
    hue: Math.random() * 360,
  }));

  const codeSnippets = [
    'const portfolio = () => {}',
    'function createMagic()',
    'import React from "react"',
    'export default App',
    'useState(false)',
    'useEffect(() => {})',
    'return <div>',
    'className="frosted-glass"',
    'framer-motion',
    'backdrop-blur-xl',
    'transform: translate3d()',
    '// macOS vibes ✨',
  ];

  const macOSWindows = Array.from({ length: window.innerWidth < 768 ? 2 : 4 }, (_, i) => ({
    id: i,
    width: (window.innerWidth < 768 ? 100 : 140) + i * (window.innerWidth < 768 ? 15 : 25),
    height: (window.innerWidth < 768 ? 60 : 90) + i * (window.innerWidth < 768 ? 10 : 20),
    x: 15 + i * (window.innerWidth < 768 ? 15 : 20),
    y: 25 + i * (window.innerWidth < 768 ? 10 : 15),
    speed: 0.12 + i * 0.03,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {/* Enhanced Floating Geometric Shapes */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full backdrop-blur-sm"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.initialX}%`,
            top: `${element.initialY}%`,
            opacity: element.opacity,
            filter: `blur(${element.blur}px)`,
            background: `linear-gradient(135deg, 
              hsla(${element.hue}, 70%, 60%, 0.1) 0%, 
              hsla(${(element.hue + 60) % 360}, 70%, 60%, 0.05) 100%)`,
          }}
          animate={{
            x: mousePosition.x * element.speed,
            y: mousePosition.y * element.speed,
            rotate: mousePosition.x * element.speed * 0.3,
            scale: [1, 1.1, 1],
          }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            scale: {
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
        />
      ))}

      {/* Floating Code Snippets with Enhanced Styling - Hidden on mobile */}
      {window.innerWidth >= 768 && codeSnippets.map((snippet, index) => (
        <motion.div
          key={snippet}
          className="absolute text-xs font-mono text-white/15 select-none px-2 py-1 rounded bg-white/5 backdrop-blur-sm border border-white/10 hidden sm:block"
          style={{
            left: `${(index * 12 + 8) % 85}%`,
            top: `${(index * 18 + 12) % 75}%`,
          }}
          animate={{
            x: mousePosition.x * (0.08 + index * 0.015),
            y: mousePosition.y * (0.08 + index * 0.015),
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            type: "spring",
            stiffness: 25,
            damping: 30,
            opacity: {
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
        >
          {snippet}
        </motion.div>
      ))}

      {/* Enhanced macOS-style Windows */}
      {macOSWindows.map((window, i) => (
        <motion.div
          key={`window-${i}`}
          className="absolute bg-white/8 backdrop-blur-md rounded-lg sm:rounded-xl border border-white/15 shadow-2xl"
          style={{
            width: window.width,
            height: window.height,
            left: `${window.x}%`,
            top: `${window.y}%`,
          }}
          animate={{
            x: mousePosition.x * window.speed,
            y: mousePosition.y * window.speed,
            rotateY: mousePosition.x * 0.02,
            rotateX: mousePosition.y * -0.02,
          }}
          transition={{
            type: "spring",
            stiffness: 35,
            damping: 25,
          }}
        >
          {/* Enhanced Window Controls */}
          <div className="flex items-center space-x-1 sm:space-x-2 p-2 sm:p-3">
            <motion.div 
              className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500/60 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.2, backgroundColor: "rgba(239, 68, 68, 0.8)" }}
            />
            <motion.div 
              className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500/60 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.2, backgroundColor: "rgba(245, 158, 11, 0.8)" }}
            />
            <motion.div 
              className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500/60 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.2, backgroundColor: "rgba(34, 197, 94, 0.8)" }}
            />
          </div>
          
          {/* Window Content with Animation */}
          <div className="px-2 sm:px-3 pb-2 sm:pb-3 space-y-1 sm:space-y-2">
            {[...Array(3)].map((_, lineIndex) => (
              <motion.div
                key={lineIndex}
                className="h-1 sm:h-1.5 bg-white/15 rounded-full"
                style={{ width: `${60 + Math.random() * 30}%` }}
                animate={{
                  opacity: [0.15, 0.3, 0.15],
                  scaleX: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2 + lineIndex * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: lineIndex * 0.3,
                }}
              />
            ))}
          </div>
          
          {/* Window Reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-lg sm:rounded-xl pointer-events-none" />
        </motion.div>
      ))}

      {/* Enhanced Grid Pattern with Depth - Responsive */}
      <motion.div
        className="absolute inset-0 opacity-4 sm:opacity-8"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: window.innerWidth < 768 ? '40px 40px, 40px 40px, 15px 15px, 15px 15px' : '60px 60px, 60px 60px, 20px 20px, 20px 20px',
        }}
        animate={{
          x: mousePosition.x * 0.03,
          y: mousePosition.y * 0.03,
        }}
        transition={{
          type: "spring",
          stiffness: 15,
          damping: 35,
        }}
      />

      {/* Floating Particles - Reduced on mobile */}
      {Array.from({ length: window.innerWidth < 768 ? 10 : 20 }, (_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxBackground;