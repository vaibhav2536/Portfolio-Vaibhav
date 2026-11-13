import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Radio } from 'lucide-react';
import { apps } from '../config/apps';
import { currentlyDoing, personalInfo } from '../data/portfolioData';

const fileNames: Record<string, string> = {
  about: 'about_me.app',
  experience: 'experience.log',
  skills: 'skills.json',
  projects: 'projects/',
  achievements: 'wins.md',
  resume: 'resume.pdf',
  links: 'connect.url',
};

interface Props {
  dimmed: boolean;
  onOpenWindow: (id: string, title: string) => void;
}

/** macOS-style desktop icons (right) and widgets (left) on large screens. */
const DesktopShelves: React.FC<Props> = ({ dimmed, onOpenWindow }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(email);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-28 top-9 hidden lg:block"
      animate={{ opacity: dimmed ? 0.25 : 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Desktop icons */}
      <div className="absolute bottom-2 right-5 top-5 flex flex-col flex-wrap-reverse content-start gap-1">
        {apps.map((app, i) => {
          const Icon = app.icon;
          return (
            <motion.button
              key={app.id}
              type="button"
              onClick={() => onOpenWindow(app.id, app.title)}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.06, type: 'spring', stiffness: 200, damping: 20 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="group pointer-events-auto flex w-[88px] flex-col items-center gap-1.5 rounded-xl p-2 transition-colors hover:bg-white/[0.07] focus:bg-violet-500/15 focus:outline-none"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br ${app.gradient} shadow-lg shadow-black/40`}
              >
                <Icon className="h-6 w-6 text-white drop-shadow" />
              </span>
              <span className="rounded px-1 font-mono text-[11px] text-white/80 group-focus:bg-violet-500/70 group-focus:text-white">
                {fileNames[app.id]}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Widgets */}
      <div className="pointer-events-auto absolute left-5 top-5 hidden w-64 flex-col gap-3 xl:flex">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, type: 'spring', stiffness: 160, damping: 20 }}
          className="glass-card p-4"
        >
          <div className="mb-3 flex items-center gap-2">
            <Radio className="h-3.5 w-3.5 text-emerald-300" />
            <span className="eyebrow !text-emerald-300/80">Now</span>
          </div>
          <ul className="space-y-2.5">
            {currentlyDoing.map(c => (
              <li key={c.label} className="text-left">
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/35">{c.label}</div>
                <div className="text-[13px] leading-snug text-white/85">{c.value}</div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, type: 'spring', stiffness: 160, damping: 20 }}
          className="glass-card p-2"
        >
          <div className="eyebrow px-2 pb-1 pt-2">Say hello</div>
          {[
            { label: 'Personal', email: personalInfo.email },
            { label: 'Work · Outlynk', email: personalInfo.workEmail },
          ].map(({ label, email }) => (
            <button
              key={email}
              type="button"
              onClick={() => copyEmail(email)}
              className="group w-full rounded-xl px-2 py-2 text-left transition-colors hover:bg-white/[0.06]"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/35">
                {copied === email ? <span className="text-emerald-300">Copied ✓</span> : label}
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[13px] text-white/85">{email}</span>
                {copied === email ? (
                  <Check className="h-4 w-4 flex-shrink-0 text-emerald-300" />
                ) : (
                  <Copy className="h-4 w-4 flex-shrink-0 text-white/30 transition-colors group-hover:text-white" />
                )}
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DesktopShelves;
