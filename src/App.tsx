import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import Window from './components/Window';
import MenuBar from './components/MenuBar';
import DesktopHero from './components/DesktopHero';
import DesktopShelves from './components/DesktopShelves';
import CommandPalette from './components/CommandPalette';
import BootScreen from './components/BootScreen';
import { useWindowManager } from './hooks/useWindowManager';
import { getApp } from './config/apps';

// Window Components
import AboutWindow from './components/windows/AboutWindow';
import SkillsWindow from './components/windows/SkillsWindow';
import ExperienceWindow from './components/windows/ExperienceWindow';
import ProjectsWindow from './components/windows/ProjectsWindow';
import AchievementsWindow from './components/windows/AchievementsWindow';
import ResumeWindow from './components/windows/ResumeWindow';
import LinksWindow from './components/windows/LinksWindow';

const windowComponents: { [key: string]: React.ComponentType } = {
  about: AboutWindow,
  skills: SkillsWindow,
  experience: ExperienceWindow,
  projects: ProjectsWindow,
  achievements: AchievementsWindow,
  resume: ResumeWindow,
  links: LinksWindow,
};

function App() {
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleFullscreen,
    bringToFront,
    updateWindowPosition,
    closeAll,
  } = useWindowManager();
  const [paletteOpen, setPaletteOpen] = useState(false);

  const openPalette = useCallback(() => setPaletteOpen(true), []);

  // Deep links: /#about, /#experience, /#resume … open that window on load.
  useEffect(() => {
    const openFromHash = () => {
      const app = getApp(window.location.hash.replace('#', ''));
      if (app) openWindow(app.id, app.title);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [openWindow]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(o => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const visibleWindows = windows.filter(w => w.isOpen && !w.isMinimized);
  const focused = visibleWindows.reduce<(typeof windows)[number] | undefined>(
    (top, w) => (!top || w.zIndex > top.zIndex ? w : top),
    undefined
  );
  const openWindowIds = windows.filter(w => w.isOpen).map(w => w.id);
  const desktopDimmed = visibleWindows.length > 0;

  return (
    <div className="min-h-screen bg-ink-950">
      <BootScreen />
      <Desktop>
        <MenuBar
          activeTitle={focused?.title}
          onOpenWindow={openWindow}
          onOpenPalette={openPalette}
          onHome={closeAll}
        />

        <DesktopHero dimmed={desktopDimmed} onOpenWindow={openWindow} onOpenPalette={openPalette} />
        <DesktopShelves dimmed={desktopDimmed} onOpenWindow={openWindow} />

        <AnimatePresence>
          {windows
            .filter(w => w.isOpen)
            .map(w => {
              const WindowComponent = windowComponents[w.id];
              if (!WindowComponent) return null;
              return (
                <Window
                  key={w.id}
                  window={w}
                  isFocused={focused?.id === w.id}
                  onClose={() => closeWindow(w.id)}
                  onMinimize={() => minimizeWindow(w.id)}
                  onToggleFullscreen={() => toggleFullscreen(w.id)}
                  onBringToFront={() => bringToFront(w.id)}
                  onUpdatePosition={position => updateWindowPosition(w.id, position)}
                >
                  <WindowComponent />
                </Window>
              );
            })}
        </AnimatePresence>

        <Dock onOpenWindow={openWindow} openWindows={openWindowIds} onOpenPalette={openPalette} />
      </Desktop>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenWindow={openWindow}
        onCloseAll={closeAll}
      />
    </div>
  );
}

export default App;
