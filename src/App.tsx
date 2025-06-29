import React from 'react';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import Window from './components/Window';
import { useWindowManager } from './hooks/useWindowManager';

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
    updateWindowSize,
  } = useWindowManager();

  const minimizedWindows = windows
    .filter(w => w.isMinimized && w.isOpen)
    .map(w => w.id);

  return (
    <div className="min-h-screen bg-gray-900">
      <Desktop>
        {/* Render all windows */}
        {windows.map((window) => {
          const WindowComponent = windowComponents[window.id];
          if (!WindowComponent) return null;

          return (
            <Window
              key={window.id}
              window={window}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onToggleFullscreen={() => toggleFullscreen(window.id)}
              onBringToFront={() => bringToFront(window.id)}
              onUpdatePosition={(position) => updateWindowPosition(window.id, position)}
              onUpdateSize={(size) => updateWindowSize(window.id, size)}
            >
              <WindowComponent />
            </Window>
          );
        })}

        {/* Dock */}
        <Dock 
          onOpenWindow={openWindow} 
          minimizedWindows={minimizedWindows}
        />
      </Desktop>
    </div>
  );
}

export default App;