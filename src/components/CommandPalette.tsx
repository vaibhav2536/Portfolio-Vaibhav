import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, AtSign, Download, Github, Linkedin, Mail, Rocket, Search, Twitter, Code, CornerDownLeft, XCircle, LucideIcon } from 'lucide-react';
import { apps } from '../config/apps';
import { personalInfo, resume, socialLinks } from '../data/portfolioData';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onOpenWindow: (id: string, title: string) => void;
  onCloseAll: () => void;
}

interface Cmd {
  id: string;
  group: 'Navigate' | 'Actions' | 'Links';
  label: string;
  hint: string;
  icon: LucideIcon;
  gradient?: string;
  run: () => void;
}

const linkIcons: Record<string, LucideIcon> = { Github, Linkedin, Twitter, Code, Rocket, Mail };

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose, onOpenWindow, onCloseAll }) => {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: Cmd[] = useMemo(() => {
    const nav: Cmd[] = apps.map(a => ({
      id: `open-${a.id}`,
      group: 'Navigate',
      label: `Open ${a.title}`,
      hint: a.hint,
      icon: a.icon,
      gradient: a.gradient,
      run: () => onOpenWindow(a.id, a.title),
    }));
    const actions: Cmd[] = [
      {
        id: 'download-resume',
        group: 'Actions',
        label: 'Download resume (PDF)',
        hint: `Updated ${resume.updated}`,
        icon: Download,
        run: () => {
          const a = document.createElement('a');
          a.href = resume.file;
          a.download = resume.downloadName;
          a.click();
        },
      },
      {
        id: 'email',
        group: 'Actions',
        label: 'Send me an email',
        hint: personalInfo.email,
        icon: Mail,
        run: () => (window.location.href = `mailto:${personalInfo.email}`),
      },
      {
        id: 'work-email',
        group: 'Actions',
        label: 'Email me at work (Outlynk)',
        hint: personalInfo.workEmail,
        icon: AtSign,
        run: () => (window.location.href = `mailto:${personalInfo.workEmail}`),
      },
      { id: 'close-all', group: 'Actions', label: 'Close all windows', hint: 'Back to the desktop', icon: XCircle, run: onCloseAll },
    ];
    const links: Cmd[] = socialLinks
      .filter(l => !l.url.startsWith('mailto:'))
      .map(l => ({
        id: `link-${l.name}`,
        group: 'Links',
        label: `Go to ${l.name}`,
        hint: l.handle,
        icon: linkIcons[l.icon] ?? ArrowRight,
        run: () => window.open(l.url, '_blank', 'noopener,noreferrer'),
      }));
    return [...nav, ...actions, ...links];
  }, [onOpenWindow, onCloseAll]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(c => `${c.label} ${c.hint} ${c.group}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const execute = (cmd?: Cmd) => {
    if (!cmd) return;
    onClose();
    cmd.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(a => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(a => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      execute(filtered[active]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  let lastGroup = '';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex items-start justify-center bg-ink-950/60 px-4 pt-[14vh] backdrop-blur-sm"
          style={{ zIndex: 7000 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            onMouseDown={e => e.stopPropagation()}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900/90 shadow-[0_40px_120px_-20px_rgba(139,92,246,0.5)] backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3.5">
              <Search className="h-4 w-4 text-violet-300" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a command or search…"
                className="flex-1 bg-transparent text-[15px] text-white placeholder:text-white/35 focus:outline-none"
              />
              <kbd className="kbd">esc</kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-4 py-10 text-center text-sm text-white/40">
                  No results for “{query}”. Try “resume” or “github”.
                </div>
              )}
              {filtered.map((cmd, i) => {
                const showGroup = cmd.group !== lastGroup;
                lastGroup = cmd.group;
                const Icon = cmd.icon;
                const isActive = i === active;
                return (
                  <React.Fragment key={cmd.id}>
                    {showGroup && <div className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">{cmd.group}</div>}
                    <button
                      type="button"
                      data-index={i}
                      onMouseMove={() => setActive(i)}
                      onClick={() => execute(cmd)}
                      className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                        isActive ? 'bg-white/[0.08]' : ''
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="palette-active"
                          className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-gradient-to-b from-violet-400 to-cyan-300"
                        />
                      )}
                      <span
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                          cmd.gradient ? `bg-gradient-to-br ${cmd.gradient}` : 'border border-white/10 bg-white/[0.05]'
                        }`}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-white">{cmd.label}</span>
                        <span className="block truncate text-xs text-white/40">{cmd.hint}</span>
                      </span>
                      {isActive && <CornerDownLeft className="h-4 w-4 text-white/40" />}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-2.5 text-[11px] text-white/35">
              <span className="font-mono">vaibhav.os command center</span>
              <span className="flex items-center gap-2">
                <kbd className="kbd">↑</kbd>
                <kbd className="kbd">↓</kbd> navigate <kbd className="kbd">↵</kbd> open
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
