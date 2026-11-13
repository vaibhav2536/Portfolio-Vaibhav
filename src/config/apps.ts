import {
  User,
  Briefcase,
  FolderOpen,
  Award,
  FileText,
  Link2,
  Code2,
  LucideIcon,
} from 'lucide-react';

export interface AppDef {
  id: string;
  label: string;
  title: string;
  icon: LucideIcon;
  /** Tailwind gradient used for the app icon */
  gradient: string;
  /** Hint shown in the command palette */
  hint: string;
}

export const apps: AppDef[] = [
  { id: 'about', label: 'About', title: 'About Me', icon: User, gradient: 'from-violet-500 via-fuchsia-500 to-pink-500', hint: 'Who I am, what I do' },
  { id: 'experience', label: 'Experience', title: 'Work Experience', icon: Briefcase, gradient: 'from-sky-500 via-blue-500 to-indigo-600', hint: 'Stashfin, Outlynk, Bachatt, AI labs…' },
  { id: 'skills', label: 'Skills', title: 'Technical Skills', icon: Code2, gradient: 'from-emerald-400 via-teal-500 to-cyan-600', hint: 'Frontend, backend, AI & cloud' },
  { id: 'projects', label: 'Projects', title: 'My Projects', icon: FolderOpen, gradient: 'from-amber-400 via-orange-500 to-rose-500', hint: 'Things I have built' },
  { id: 'achievements', label: 'Achievements', title: 'Achievements', icon: Award, gradient: 'from-yellow-300 via-amber-500 to-orange-600', hint: 'Awards & certifications' },
  { id: 'resume', label: 'Resume', title: 'Resume', icon: FileText, gradient: 'from-rose-400 via-fuchsia-500 to-violet-600', hint: 'Preview or download the PDF' },
  { id: 'links', label: 'Links', title: 'Connect', icon: Link2, gradient: 'from-cyan-400 via-sky-500 to-violet-500', hint: 'GitHub, LinkedIn, email…' },
];

export const appIds = apps.map(a => a.id);

export const getApp = (id: string) => apps.find(a => a.id === id);
