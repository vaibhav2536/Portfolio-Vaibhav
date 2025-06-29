import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WindowState } from '../types';
import WindowControls from './WindowControls';

interface WindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onToggleFullscreen: () => void;
  onBringToFront: () => void;
  onUpdatePosition: (position: { x: number; y: number }) => void;
  onUpdateSize: (size: { width: number; height: number }) => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  window,
  onClose,
  onMinimize,
  onToggleFullscreen,
  onBringToFront,
  onUpdatePosition,
  onUpdateSize,
  children
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('window-header')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y
      });
      onBringToFront();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !window.isFullscreen) {
        onUpdatePosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, window.isFullscreen, onUpdatePosition]);

  if (!window.isOpen) return null;

  const getDockIconPosition = () => {
    const dockItems = ['about', 'skills', 'experience', 'projects', 'achievements', 'resume', 'links'];
    const index = dockItems.indexOf(window.id);
    const itemWidth = window.innerWidth < 640 ? 48 : 64;
    const spacing = window.innerWidth < 640 ? 4 : 8;
    const dockWidth = dockItems.length * itemWidth + (dockItems.length - 1) * spacing;
    const startX = (window.innerWidth - dockWidth) / 2;
    
    return {
      x: startX + (index * (itemWidth + spacing)),
      y: window.innerHeight - (window.innerWidth < 640 ? 50 : 60)
    };
  };

  const windowVariants = {
    hidden: { 
      scale: 0.7, 
      opacity: 0,
      y: 100,
      rotateX: -15,
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 0.8,
        opacity: { duration: 0.3 },
      }
    },
    minimized: {
      scale: 0.05,
      opacity: 0,
      y: 50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6,
      }
    },
    fullscreen: {
      scale: 1,
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        duration: 0.8,
      }
    }
  };

  const getWindowStyle = () => {
    if (window.isFullscreen) {
      return { 
        width: '100vw', 
        height: '100vh', 
        top: 0, 
        left: 0,
      };
    }
    
    if (window.isMinimized) {
      const dockPosition = getDockIconPosition();
      const iconSize = window.innerWidth < 640 ? 48 : 56;
      return {
        width: `${iconSize}px`,
        height: `${iconSize}px`,
        top: dockPosition.y,
        left: dockPosition.x,
      };
    }
    
    return {
      width: window.size.width,
      height: window.size.height,
      top: window.position.y,
      left: window.position.x,
    };
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={windowRef}
        className={`fixed backdrop-blur-2xl rounded-xl sm:rounded-2xl shadow-2xl border overflow-hidden ${
          window.isFullscreen ? 'rounded-none' : ''
        }`}
        style={{
          ...getWindowStyle(),
          zIndex: window.zIndex,
          background: 'rgba(255, 255, 255, 0.08)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `,
        }}
        variants={windowVariants}
        initial="hidden"
        animate={
          window.isMinimized ? "minimized" : 
          window.isFullscreen ? "fullscreen" : 
          "visible"
        }
        onMouseDown={onBringToFront}
        whileHover={!isDragging ? { 
          boxShadow: `
            0 32px 64px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.25)
          `,
          scale: 1.01,
        } : {}}
        transition={{ duration: 0.2 }}
      >
        {/* Frosted Glass Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none rounded-xl sm:rounded-2xl" />
        
        {/* Window Header */}
        <motion.div
          className="window-header relative flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-sm border-b cursor-move flex-shrink-0"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
          }}
          onMouseDown={handleMouseDown}
          whileHover={{ 
            background: "rgba(255, 255, 255, 0.15)",
            transition: { duration: 0.2 }
          }}
        >
          <WindowControls
            onClose={onClose}
            onMinimize={onMinimize}
            onToggleFullscreen={onToggleFullscreen}
            isFullscreen={window.isFullscreen}
          />
          <div className="flex-1 text-center">
            <h2 className="text-xs sm:text-sm font-medium text-white/90 drop-shadow-sm truncate px-2">
              {window.title}
            </h2>
          </div>
          <div className="w-10 sm:w-14" />
          
          {/* Header Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Window Content */}
        <div 
          className="flex-1 overflow-hidden relative" 
          style={{ height: 'calc(100% - 45px)' }}
        >
          {/* Content Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/30 backdrop-blur-sm" />
          
          {/* Scrollable Content */}
          <div className="relative h-full overflow-y-auto overflow-x-hidden">
            {children}
          </div>
          
          {/* Content Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5 pointer-events-none" />
        </div>
        
        {/* Window Border Glow */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none">
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Window;