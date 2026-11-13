import React from 'react';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';

interface WindowControlsProps {
  onClose: () => void;
  onMinimize: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

const WindowControls: React.FC<WindowControlsProps> = ({ onClose, onMinimize, onToggleFullscreen, isFullscreen }) => {
  const controls = [
    { onClick: onClose, label: 'Close window', color: 'bg-[#ff5f57]', glow: 'rgba(255,95,87,0.6)', icon: X },
    { onClick: onMinimize, label: 'Minimize window', color: 'bg-[#febc2e]', glow: 'rgba(254,188,46,0.6)', icon: Minus },
    {
      onClick: onToggleFullscreen,
      label: isFullscreen ? 'Exit full screen' : 'Enter full screen',
      color: 'bg-[#28c840]',
      glow: 'rgba(40,200,64,0.6)',
      icon: isFullscreen ? Minimize2 : Maximize2,
    },
  ];

  return (
    <div className="group relative z-10 flex items-center gap-2">
      {controls.map(({ onClick, label, color, glow, icon: Icon }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          title={label}
          onClick={onClick}
          className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${color} transition-transform duration-150 hover:scale-110 active:scale-90`}
          style={{ boxShadow: `0 0 10px -2px ${glow}, inset 0 1px 0 rgba(255,255,255,0.35)` }}
        >
          <Icon className="h-2 w-2 text-black/60 opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={3} />
        </button>
      ))}
    </div>
  );
};

export default WindowControls;
