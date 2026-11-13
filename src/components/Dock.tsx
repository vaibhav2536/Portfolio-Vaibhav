import React, { useRef, useState } from 'react';
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Command } from 'lucide-react';
import { apps, AppDef } from '../config/apps';

interface DockProps {
  onOpenWindow: (id: string, title: string) => void;
  openWindows: string[];
  onOpenPalette: () => void;
}

const BASE = 50;
const MAX = 82;

const DockIcon: React.FC<{
  mouseX: MotionValue<number>;
  label: string;
  isOpen?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className: string;
}> = ({ mouseX, label, isOpen, onClick, children, className }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, val => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - b.x - b.width / 2;
  });
  const base = globalThis.innerWidth < 640 ? 42 : BASE;
  const sizeSync = useTransform(distance, [-160, 0, 160], [base, MAX, base]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 170, damping: 14 });

  return (
    <div className="relative flex flex-col items-center">
      <motion.span
        className="pointer-events-none absolute -top-11 whitespace-nowrap rounded-lg border border-white/10 bg-ink-900/90 px-2.5 py-1 text-xs font-medium text-white shadow-xl backdrop-blur-xl"
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.15 }}
      >
        {label}
      </motion.span>
      <motion.button
        ref={ref}
        type="button"
        aria-label={label}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ width: size, height: size }}
        whileTap={{ scale: 0.85 }}
        className={`group relative flex items-center justify-center overflow-hidden rounded-[28%] shadow-lg ${className}`}
      >
        <span className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/20" />
        <span className="absolute inset-x-2 top-1 h-1/3 rounded-full bg-white/25 blur-md" />
        <span className="relative">{children}</span>
      </motion.button>
      <span
        className={`mt-1 h-1 w-1 rounded-full bg-white transition-opacity duration-300 ${isOpen ? 'opacity-90' : 'opacity-0'}`}
        style={{ boxShadow: '0 0 6px rgba(255,255,255,0.9)' }}
      />
    </div>
  );
};

const Dock: React.FC<DockProps> = ({ onOpenWindow, openWindows, onOpenPalette }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-2 flex justify-center px-2 sm:bottom-4" style={{ zIndex: 5000 }}>
      <motion.nav
        aria-label="Dock"
        onMouseMove={e => globalThis.innerWidth >= 640 && mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.6 }}
        className="pointer-events-auto flex max-w-full items-end gap-2 overflow-x-auto rounded-[22px] border border-white/10 bg-white/[0.06] px-3 pb-1.5 pt-2.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:gap-3 sm:overflow-visible"
        style={{ boxShadow: '0 20px 60px -15px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.12)' }}
      >
        {apps.map((app: AppDef) => {
          const Icon = app.icon;
          return (
            <DockIcon
              key={app.id}
              mouseX={mouseX}
              label={app.label}
              isOpen={openWindows.includes(app.id)}
              onClick={() => onOpenWindow(app.id, app.title)}
              className={`bg-gradient-to-br ${app.gradient}`}
            >
              <Icon className="h-[22px] w-[22px] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] sm:h-6 sm:w-6" />
            </DockIcon>
          );
        })}

        {/* On phones the menu-bar search button opens the palette instead */}
        {globalThis.innerWidth >= 640 && (
          <>
            <div className="mx-0.5 mb-3 h-10 w-px self-center bg-white/15" />
            <DockIcon mouseX={mouseX} label="Command Palette (⌘K)" onClick={onOpenPalette} className="bg-ink-800 ring-1 ring-white/15">
              <Command className="h-6 w-6 text-violet-200" />
            </DockIcon>
          </>
        )}
      </motion.nav>
    </div>
  );
};

export default Dock;
