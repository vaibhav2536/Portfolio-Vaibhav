import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Briefcase, 
  FolderOpen, 
  Award, 
  FileText, 
  ExternalLink,
  Code2
} from 'lucide-react';

interface DockProps {
  onOpenWindow: (id: string, title: string) => void;
  minimizedWindows?: string[];
}

const dockItems = [
  { id: 'about', label: 'About', icon: User, title: 'About Me' },
  { id: 'skills', label: 'Skills', icon: Code2, title: 'Technical Skills' },
  { id: 'experience', label: 'Experience', icon: Briefcase, title: 'Work Experience' },
  { id: 'projects', label: 'Projects', icon: FolderOpen, title: 'My Projects' },
  { id: 'achievements', label: 'Achievements', icon: Award, title: 'Achievements' },
  { id: 'resume', label: 'Resume', icon: FileText, title: 'Resume' },
  { id: 'links', label: 'Links', icon: ExternalLink, title: 'Social Links' }
];

const Dock: React.FC<DockProps> = ({ onOpenWindow, minimizedWindows = [] }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const bounceVariants = {
    initial: { scale: 1, y: 0, rotateY: 0 },
    hover: { 
      scale: 1.3, 
      y: -12,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        mass: 0.6
      }
    },
    tap: { 
      scale: 0.9,
      y: 4,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 15
      }
    }
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: [0, -8, 8, -8, 0],
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="fixed bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-2 sm:px-0">
      <motion.div 
        className="backdrop-blur-2xl rounded-2xl sm:rounded-3xl px-2 sm:px-4 py-2 sm:py-3 shadow-2xl border overflow-x-auto"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `,
        }}
        initial={{ y: 100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20,
          delay: 0.3 
        }}
      >
        {/* Dock Reflection */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-white/10 rounded-2xl sm:rounded-3xl pointer-events-none" />
        
        <div className="flex items-center space-x-1 sm:space-x-3 relative min-w-max">
          {dockItems.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredItem === item.id;
            const isMinimized = minimizedWindows.includes(item.id);
            
            return (
              <div key={item.id} className="relative">
                {/* Enhanced Tooltip */}
                <motion.div
                  className="absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2 backdrop-blur-xl text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl whitespace-nowrap pointer-events-none border z-50"
                  style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  }}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0, 
                    y: isHovered ? 0 : 10,
                    scale: isHovered ? 1 : 0.8
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                  }}
                >
                  {item.label}
                  {/* Tooltip Arrow */}
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45"
                    style={{ background: 'rgba(0, 0, 0, 0.8)' }}
                  />
                </motion.div>

                {/* Enhanced Dock Item */}
                <motion.button
                  variants={bounceVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => onOpenWindow(item.id, item.title)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative w-12 h-12 sm:w-16 sm:h-16 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border flex items-center justify-center overflow-hidden group"
                  style={{
                    transformOrigin: 'bottom center',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    boxShadow: `
                      0 8px 32px rgba(0, 0, 0, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `,
                  }}
                >
                  {/* Enhanced Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl sm:rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Icon with enhanced animation */}
                  <motion.div
                    variants={iconVariants}
                    initial="initial"
                    animate={isHovered ? "hover" : "initial"}
                    className="relative z-10"
                  >
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white/90 drop-shadow-lg" />
                  </motion.div>

                  {/* Enhanced Minimized Indicator */}
                  {isMinimized && (
                    <motion.div 
                      className="absolute -bottom-0.5 sm:-bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                      style={{
                        background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                        boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)',
                      }}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}

                  {/* Enhanced Reflection Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-xl sm:rounded-2xl pointer-events-none" />
                  
                  {/* Shine Animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl sm:rounded-2xl"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut",
                    }}
                  />
                </motion.button>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Dock;