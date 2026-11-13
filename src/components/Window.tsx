import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { WindowState } from '../types';
import WindowControls from './WindowControls';
import { getApp } from '../config/apps';
import { MENU_BAR_HEIGHT } from '../hooks/useWindowManager';

interface WindowProps {
  window: WindowState;
  isFocused: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onToggleFullscreen: () => void;
  onBringToFront: () => void;
  onUpdatePosition: (position: { x: number; y: number }) => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  window: win,
  isFocused,
  onClose,
  onMinimize,
  onToggleFullscreen,
  onBringToFront,
  onUpdatePosition,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const app = getApp(win.id);
  const Icon = app?.icon;

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (win.isFullscreen || globalThis.innerWidth < 640) return;
    e.preventDefault();
    dragOffset.current = { x: e.clientX - win.position.x, y: e.clientY - win.position.y };
    setIsDragging(true);
    onBringToFront();
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: PointerEvent) =>
      onUpdatePosition({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    const onUp = () => setIsDragging(false);
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    };
  }, [isDragging, onUpdatePosition]);

  const vw = globalThis.innerWidth;
  const vh = globalThis.innerHeight;
  const isMobile = vw < 640;

  const geometry = win.isFullscreen
    ? { left: 0, top: MENU_BAR_HEIGHT, width: vw, height: vh - MENU_BAR_HEIGHT }
    : isMobile
      ? { left: 8, top: win.position.y, width: vw - 16, height: win.size.height }
      : { left: win.position.x, top: win.position.y, width: win.size.width, height: win.size.height };

  const visualState = win.isMinimized
    ? { opacity: 0, scale: 0.15, y: vh - geometry.top - geometry.height / 2 }
    : { opacity: 1, scale: 1, y: 0 };

  const spring = { type: 'spring', stiffness: 260, damping: 28, mass: 0.8 };

  return (
    <motion.div
      className="fixed flex flex-col"
      style={{
        zIndex: win.zIndex,
        pointerEvents: win.isMinimized ? 'none' : 'auto',
        transformOrigin: 'center bottom',
      }}
      initial={{ ...geometry, opacity: 0, scale: 0.9, y: 30 }}
      animate={{ ...geometry, ...visualState }}
      exit={{ opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.18 } }}
      transition={
        isDragging
          ? { left: { duration: 0 }, top: { duration: 0 }, default: spring }
          : spring
      }
      onPointerDown={onBringToFront}
    >
      {/* Animated gradient border for the focused window */}
      <div
        className={`absolute -inset-px overflow-hidden transition-opacity duration-500 ${
          win.isFullscreen ? 'rounded-none' : 'rounded-2xl'
        } ${isFocused ? 'opacity-100' : 'opacity-0'}`}
        style={{
          padding: 1,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, #a78bfa 60deg, #f0abfc 120deg, transparent 180deg, transparent 200deg, #67e8f9 280deg, transparent 340deg)',
          }}
        />
      </div>

      {/* Window body */}
      <div
        className={`relative flex h-full flex-col overflow-hidden border bg-ink-900/85 backdrop-blur-2xl ${
          win.isFullscreen ? 'rounded-none' : 'rounded-2xl'
        } ${isFocused ? 'border-transparent' : 'border-white/10'}`}
        style={{
          boxShadow: isFocused
            ? '0 40px 100px -20px rgba(0,0,0,0.8), 0 0 60px -15px rgba(167,139,250,0.35)'
            : '0 25px 60px -20px rgba(0,0,0,0.7)',
        }}
      >
        {/* Title bar */}
        <div
          className={`relative flex h-11 flex-shrink-0 select-none items-center border-b border-white/[0.06] bg-white/[0.03] px-4 ${
            win.isFullscreen || isMobile ? '' : isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onPointerDown={handlePointerDown}
          onDoubleClick={e => {
            if (!(e.target as HTMLElement).closest('button')) onToggleFullscreen();
          }}
        >
          <WindowControls
            onClose={onClose}
            onMinimize={onMinimize}
            onToggleFullscreen={onToggleFullscreen}
            isFullscreen={win.isFullscreen}
          />
          <div className="pointer-events-none absolute inset-x-0 flex items-center justify-center gap-2">
            {Icon && (
              <span className={`flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br ${app?.gradient}`}>
                <Icon className="h-3 w-3 text-white" />
              </span>
            )}
            <span className={`text-[13px] font-medium transition-colors ${isFocused ? 'text-white/90' : 'text-white/45'}`}>
              {win.title}
            </span>
          </div>
          <span className="ml-auto hidden font-mono text-[11px] text-white/30 md:block">~/vaibhav/{win.id}</span>
        </div>

        {/* Content */}
        <div className={`relative flex-1 overflow-y-auto overflow-x-hidden ${win.isFullscreen ? 'pb-24' : ''}`}>
          {children}
        </div>

        {/* Dim unfocused windows slightly */}
        <div
          className={`pointer-events-none absolute inset-0 bg-ink-950/25 transition-opacity duration-300 ${
            isFocused ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </motion.div>
  );
};

export default Window;
