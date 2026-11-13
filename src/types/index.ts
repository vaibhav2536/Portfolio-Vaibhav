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

export type ExperienceType = 'Full-time' | 'Founder' | 'Freelance' | 'Internship';

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  type: ExperienceType;
  current?: boolean;
  /** One-line summary of the role, shown under the header */
  summary: string;
  /** Highlights; wrap text in **double asterisks** to emphasise metrics */
  achievements: string[];
  tech: string[];
  link?: string;
  /** Tailwind gradient classes used for the company badge */
  accent: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'award' | 'certification' | 'recognition' | 'milestone';
  link?: string;
  featured?: boolean;
}

export interface Stat {
  value: string;
  label: string;
}
