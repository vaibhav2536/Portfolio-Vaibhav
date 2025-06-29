import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';

interface WindowControlsProps {
  onClose: () => void;
  onMinimize: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

const WindowControls: React.FC<WindowControlsProps> = ({ 
  onClose, 
  onMinimize, 
  onToggleFullscreen,
  isFullscreen 
}) => {
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.15,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 15
      }
    }
  };

  const iconVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: { 
      opacity: 1,
      scale: 1,
      transition: { duration: 0.15 }
    }
  };

  const controls = [
    {
      onClick: onClose,
      className: "bg-red-500 hover:bg-red-600",
      icon: X,
      shadowColor: "rgba(239, 68, 68, 0.4)"
    },
    {
      onClick: onMinimize,
      className: "bg-yellow-500 hover:bg-yellow-600",
      icon: Minus,
      shadowColor: "rgba(245, 158, 11, 0.4)"
    },
    {
      onClick: onToggleFullscreen,
      className: "bg-green-500 hover:bg-green-600",
      icon: Square,
      shadowColor: "rgba(34, 197, 94, 0.4)"
    }
  ];

  return (
    <div className="flex items-center space-x-2">
      {controls.map((control, index) => {
        const Icon = control.icon;
        
        return (
          <motion.button
            key={index}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={control.onClick}
            className={`w-4 h-4 ${control.className} rounded-full transition-colors duration-150 group flex items-center justify-center relative overflow-hidden`}
            style={{
              boxShadow: `0 2px 8px ${control.shadowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
            }}
          >
            {/* Button Shine */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full" />
            
            {/* Icon */}
            <motion.div
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              className="absolute inset-0 flex items-center justify-center"
            >
              <Icon className={`w-2.5 h-2.5 ${
                index === 0 ? 'text-red-900' : 
                index === 1 ? 'text-yellow-900' : 
                'text-green-900'
              } drop-shadow-sm`} />
            </motion.div>
            
            {/* Hover Glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ 
                background: `radial-gradient(circle, ${control.shadowColor} 0%, transparent 70%)`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        );
      })}
    </div>
  );
};

export default WindowControls;