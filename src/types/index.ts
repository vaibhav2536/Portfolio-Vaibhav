export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isFullscreen: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  minimizedPosition?: { x: number; y: number };
}

export interface DockItem {
  id: string;
  label: string;
  icon: string;
  component: React.ComponentType;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  // description: string;
  achievements: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'award' | 'certification' | 'recognition';
  link?: string;
}