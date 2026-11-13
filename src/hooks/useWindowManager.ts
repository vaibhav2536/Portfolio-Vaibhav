import { useState, useCallback, useRef } from 'react';
import { WindowState } from '../types';

export const MENU_BAR_HEIGHT = 36;
export const DOCK_RESERVE = 110;

const constrainToViewport = (
  position: { x: number; y: number },
  size: { width: number; height: number }
) => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return {
    x: Math.max(0, Math.min(position.x, vw - size.width)),
    y: Math.max(MENU_BAR_HEIGHT + 4, Math.min(position.y, vh - size.height - DOCK_RESERVE + 40)),
  };
};

const preferredSizes: Record<string, { width: number; height: number }> = {
  about: { width: 980, height: 720 },
  skills: { width: 1040, height: 720 },
  experience: { width: 980, height: 740 },
  projects: { width: 1100, height: 740 },
  achievements: { width: 960, height: 700 },
  resume: { width: 1000, height: 740 },
  links: { width: 760, height: 680 },
};

const getOptimalWindowSize = (id: string) => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const availableH = vh - MENU_BAR_HEIGHT - DOCK_RESERVE;

  if (vw < 640) {
    return { width: vw - 16, height: Math.max(320, availableH - 8) };
  }

  const pref = preferredSizes[id] ?? { width: 900, height: 680 };
  return {
    width: Math.min(pref.width, vw - (vw < 1024 ? 40 : 120)),
    height: Math.min(pref.height, availableH - 24),
  };
};

export const useWindowManager = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const zCounter = useRef(1000);
  const nextZ = () => ++zCounter.current;

  const openWindow = useCallback((id: string, title: string) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === id);
      const z = nextZ();

      if (existing) {
        // Re-opening a closed window starts fresh (centred) so it never reappears off-screen.
        if (!existing.isOpen) {
          const size = getOptimalWindowSize(id);
          const position = constrainToViewport(
            {
              x: (window.innerWidth - size.width) / 2,
              y: MENU_BAR_HEIGHT + (window.innerHeight - MENU_BAR_HEIGHT - DOCK_RESERVE - size.height) / 2,
            },
            size
          );
          return prev.map(w =>
            w.id === id ? { ...w, isOpen: true, isMinimized: false, isFullscreen: false, size, position, zIndex: z } : w
          );
        }
        return prev.map(w =>
          w.id === id
            ? {
                ...w,
                isMinimized: false,
                zIndex: z,
                position: w.isMinimized ? w.minimizedPosition || w.position : w.position,
              }
            : w
        );
      }

      const size = getOptimalWindowSize(id);
      const openCount = prev.filter(w => w.isOpen && !w.isMinimized).length;
      const cascade = window.innerWidth < 640 ? 0 : openCount * 28;
      const position = constrainToViewport(
        {
          x: (window.innerWidth - size.width) / 2 + cascade,
          y: MENU_BAR_HEIGHT + (window.innerHeight - MENU_BAR_HEIGHT - DOCK_RESERVE - size.height) / 2 + cascade,
        },
        size
      );

      return [
        ...prev,
        { id, title, isOpen: true, isMinimized: false, isFullscreen: false, position, size, zIndex: z },
      ];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isOpen: false, isFullscreen: false } : w)));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMinimized: true, minimizedPosition: w.position } : w))
    );
  }, []);

  const toggleFullscreen = useCallback((id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isFullscreen: !w.isFullscreen, zIndex: nextZ() } : w)));
  }, []);

  const bringToFront = useCallback((id: string) => {
    setWindows(prev => {
      const target = prev.find(w => w.id === id);
      if (!target) return prev;
      const maxZ = Math.max(...prev.map(w => w.zIndex));
      if (target.zIndex === maxZ) return prev;
      const z = nextZ();
      return prev.map(w => (w.id === id ? { ...w, zIndex: z } : w));
    });
  }, []);

  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, position: constrainToViewport(position, w.size) } : w))
    );
  }, []);

  const closeAll = useCallback(() => {
    setWindows(prev => prev.map(w => ({ ...w, isOpen: false, isFullscreen: false })));
  }, []);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleFullscreen,
    bringToFront,
    updateWindowPosition,
    closeAll,
  };
};
