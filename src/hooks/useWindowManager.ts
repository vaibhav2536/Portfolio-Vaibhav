import { useState, useCallback } from 'react';
import { WindowState } from '../types';

export const useWindowManager = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [highestZIndex, setHighestZIndex] = useState(1000);

  const constrainToViewport = (position: { x: number; y: number }, size: { width: number; height: number }) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const dockHeight = 100; // Account for dock space + padding
    const headerHeight = 30; // Account for potential menu bar
    
    return {
      x: Math.max(0, Math.min(position.x, viewportWidth - size.width)),
      y: Math.max(headerHeight, Math.min(position.y, viewportHeight - size.height - dockHeight))
    };
  };

  const getDockIconPosition = (windowId: string) => {
    const dockItems = ['about', 'skills', 'experience', 'projects', 'achievements', 'resume', 'links'];
    const index = dockItems.indexOf(windowId);
    const itemWidth = window.innerWidth < 640 ? 48 : 64; // Responsive item width
    const spacing = window.innerWidth < 640 ? 4 : 8; // Responsive spacing
    const dockWidth = dockItems.length * itemWidth + (dockItems.length - 1) * spacing;
    const startX = (window.innerWidth - dockWidth) / 2;
    
    return {
      x: startX + (index * (itemWidth + spacing)),
      y: window.innerHeight - (window.innerWidth < 640 ? 50 : 60) // Responsive dock height
    };
  };

  const getOptimalWindowSize = (id: string) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const dockHeight = 100;
    
    // Mobile-first responsive sizing
    if (viewportWidth < 640) {
      // Mobile sizes
      return {
        width: Math.min(viewportWidth - 20, 380),
        height: Math.min(viewportHeight - dockHeight - 40, 500)
      };
    } else if (viewportWidth < 1024) {
      // Tablet sizes
      const maxWidth = Math.min(700, viewportWidth - 60);
      const maxHeight = Math.min(600, viewportHeight - dockHeight - 60);
      
      switch (id) {
        case 'about':
          return { width: Math.min(600, maxWidth), height: Math.min(550, maxHeight) };
        case 'skills':
          return { width: Math.min(700, maxWidth), height: Math.min(600, maxHeight) };
        case 'experience':
          return { width: Math.min(650, maxWidth), height: Math.min(580, maxHeight) };
        case 'achievements':
          return { width: Math.min(650, maxWidth), height: Math.min(580, maxHeight) };
        case 'projects':
          return { width: Math.min(700, maxWidth), height: Math.min(600, maxHeight) };
        case 'resume':
          return { width: Math.min(500, maxWidth), height: Math.min(450, maxHeight) };
        case 'links':
          return { width: Math.min(450, maxWidth), height: Math.min(400, maxHeight) };
        default:
          return { width: Math.min(650, maxWidth), height: Math.min(550, maxHeight) };
      }
    } else {
      // Desktop sizes
      const maxWidth = Math.min(1200, viewportWidth - 80);
      const maxHeight = Math.min(800, viewportHeight - dockHeight - 80);
      
      switch (id) {
        case 'about':
          return { width: Math.min(800, maxWidth), height: Math.min(650, maxHeight) };
        case 'skills':
          return { width: Math.min(1100, maxWidth), height: Math.min(750, maxHeight) };
        case 'experience':
          return { width: Math.min(900, maxWidth), height: Math.min(700, maxHeight) };
        case 'achievements':
          return { width: Math.min(900, maxWidth), height: Math.min(700, maxHeight) };
        case 'projects':
          return { width: Math.min(1100, maxWidth), height: Math.min(750, maxHeight) };
        case 'resume':
          return { width: Math.min(700, maxWidth), height: Math.min(600, maxHeight) };
        case 'links':
          return { width: Math.min(650, maxWidth), height: Math.min(550, maxHeight) };
        default:
          return { width: Math.min(900, maxWidth), height: Math.min(700, maxHeight) };
      }
    }
  };

  const openWindow = useCallback((id: string, title: string) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === id);
      if (existing) {
        if (existing.isMinimized) {
          // Restore from minimized state
          return prev.map(w => 
            w.id === id 
              ? { 
                  ...w, 
                  isOpen: true, 
                  isMinimized: false, 
                  zIndex: highestZIndex + 1,
                  position: w.minimizedPosition || w.position
                }
              : w
          );
        } else {
          // Just bring to front
          return prev.map(w => 
            w.id === id 
              ? { ...w, isOpen: true, zIndex: highestZIndex + 1 }
              : w
          );
        }
      }
      
      const size = getOptimalWindowSize(id);
      const basePosition = { 
        x: Math.max(10, (window.innerWidth - size.width) / 2 + (prev.length * 20)), 
        y: Math.max(30, (window.innerHeight - size.height - 100) / 2 + (prev.length * 15))
      };
      const constrainedPosition = constrainToViewport(basePosition, size);
      
      const newWindow: WindowState = {
        id,
        title,
        isOpen: true,
        isMinimized: false,
        isFullscreen: false,
        position: constrainedPosition,
        size,
        zIndex: highestZIndex + 1,
      };
      
      setHighestZIndex(prev => prev + 1);
      return [...prev, newWindow];
    });
  }, [highestZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isOpen: false } : w
    ));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        const dockPosition = getDockIconPosition(id);
        return { 
          ...w, 
          isMinimized: true,
          minimizedPosition: w.position // Store current position
        };
      }
      return w;
    }));
  }, []);

  const toggleFullscreen = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isFullscreen: !w.isFullscreen } : w
    ));
  }, []);

  const bringToFront = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: highestZIndex + 1 } : w
    ));
    setHighestZIndex(prev => prev + 1);
  }, [highestZIndex]);

  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        const constrainedPosition = constrainToViewport(position, w.size);
        return { ...w, position: constrainedPosition };
      }
      return w;
    }));
  }, []);

  const updateWindowSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        const constrainedPosition = constrainToViewport(w.position, size);
        return { ...w, size, position: constrainedPosition };
      }
      return w;
    }));
  }, []);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleFullscreen,
    bringToFront,
    updateWindowPosition,
    updateWindowSize,
  };
};