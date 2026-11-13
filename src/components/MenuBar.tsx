import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Wifi, BatteryFull } from 'lucide-react';
import { apps } from '../config/apps';
import { personalInfo } from '../data/portfolioData';

interface MenuBarProps {
  activeTitle?: string;
  onOpenWindow: (id: string, title: string) => void;
  onOpenPalette: () => void;
  onHome: () => void;
}

const useClock = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(t);
  }, []);
  return now;
};

const MenuBar: React.FC<MenuBarProps> = ({ activeTitle, onOpenWindow, onOpenPalette, onHome }) => {
  const now = useClock();
  const date = now.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  const time = now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 24, delay: 0.2 }}
      className="fixed inset-x-0 top-0 flex h-9 items-center gap-4 border-b border-white/[0.06] bg-ink-950/50 px-3 text-[13px] text-white/80 backdrop-blur-2xl sm:px-4"
      style={{ zIndex: 6000 }}
    >
      <button type="button" onClick={onHome} className="group flex items-center gap-2 font-semibold text-white" title="Close all windows">
        <span className="relative flex h-5 w-5 items-center justify-center">
          <span className="absolute inset-0 rotate-45 rounded-[5px] bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-300 transition-transform duration-500 group-hover:rotate-[225deg]" />
          <span className="relative font-display text-[10px] font-bold text-ink-950">V</span>
        </span>
        <span className="font-display tracking-tight">vaibhav.os</span>
      </button>

      {activeTitle && <span className="hidden font-semibold text-white sm:inline">{activeTitle}</span>}

      <nav className="hidden items-center gap-1 lg:flex">
        {apps.map(app => (
          <button
            key={app.id}
            type="button"
            onClick={() => onOpenWindow(app.id, app.title)}
            className="rounded-md px-2 py-0.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            {app.label}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <span className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-200 md:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          {personalInfo.availability}
        </span>

        <button
          type="button"
          onClick={onOpenPalette}
          className="flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Open command palette"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden items-center gap-0.5 sm:flex">
            <kbd className="kbd">{isMac ? '⌘' : 'Ctrl'}</kbd>
            <kbd className="kbd">K</kbd>
          </span>
        </button>

        <Wifi className="hidden h-3.5 w-3.5 text-white/70 sm:block" />
        <BatteryFull className="hidden h-4 w-4 text-white/70 sm:block" />
        <span className="hidden tabular-nums text-white/80 sm:inline">{date}</span>
        <span className="tabular-nums text-white/90">{time}</span>
      </div>
    </motion.header>
  );
};

export default MenuBar;
