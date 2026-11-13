import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, FileText, Briefcase } from 'lucide-react';
import { personalInfo, stats, coreStack } from '../data/portfolioData';
import { useTypewriter } from '../hooks/useTypewriter';

interface DesktopHeroProps {
  dimmed: boolean;
  onOpenWindow: (id: string, title: string) => void;
  onOpenPalette: () => void;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
};
const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 120, damping: 18 } },
};

const DesktopHero: React.FC<DesktopHeroProps> = ({ dimmed, onOpenWindow, onOpenPalette }) => {
  const role = useTypewriter(personalInfo.roles);
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <motion.section
      className="absolute inset-x-0 bottom-24 top-9 flex flex-col items-center justify-center px-5 text-center sm:bottom-28"
      animate={{ opacity: dimmed ? 0.18 : 1, scale: dimmed ? 0.97 : 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ pointerEvents: dimmed ? 'none' : 'auto' }}
    >
      <motion.div variants={container} initial="hidden" animate="show" className="flex max-w-4xl flex-col items-center">
        {/* Avatar with orbiting ring */}
        <motion.div variants={item} className="relative mb-5 [@media(max-height:700px)]:hidden">
          <div className="absolute -inset-[3px] animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#a78bfa,#f0abfc,#67e8f9,#a78bfa)] blur-[1px]" />
          <img
            src={personalInfo.avatar}
            alt={personalInfo.name}
            className="relative h-20 w-20 rounded-full border-[3px] border-ink-950 object-cover sm:h-24 sm:w-24"
          />
          <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-[3px] border-ink-950 bg-emerald-400" />
        </motion.div>

        {/* Terminal prompt */}
        <motion.div
          variants={item}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[11px] text-white/60 backdrop-blur-md sm:text-xs"
        >
          <span className="text-emerald-400">vaibhav@os</span>
          <span className="text-violet-300">~</span>
          <span className="text-white/40">%</span>
          <span className="text-white/80">whoami</span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-[44px] font-bold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          Vaibhav <span className="text-gradient">Dinkar</span>
        </motion.h1>

        <motion.div variants={item} className="mt-4 h-7 font-mono text-sm text-white/80 sm:mt-5 sm:text-lg">
          <span className="text-violet-300">&gt; </span>
          {role}
          <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[3px] animate-blink bg-fuchsia-300" />
        </motion.div>

        <motion.p variants={item} className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
          {personalInfo.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button type="button" className="btn-primary" onClick={() => onOpenWindow('about', 'About Me')}>
            <Sparkles className="h-4 w-4" />
            Explore my story
          </button>
          <button type="button" className="btn-ghost" onClick={() => onOpenWindow('experience', 'Work Experience')}>
            <Briefcase className="h-4 w-4" />
            Experience
          </button>
          <button type="button" className="btn-ghost" onClick={() => onOpenWindow('resume', 'Resume')}>
            <FileText className="h-4 w-4" />
            Resume
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </button>
        </motion.div>

        <motion.button
          variants={item}
          type="button"
          onClick={onOpenPalette}
          className="mt-5 hidden items-center gap-2 text-xs text-white/40 transition-colors hover:text-white/70 sm:flex"
        >
          press <kbd className="kbd">{isMac ? '⌘' : 'Ctrl'}</kbd>
          <kbd className="kbd">K</kbd> to jump anywhere
        </motion.button>

        {/* Stats */}
        <motion.div
          variants={item}
          className="mt-8 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4 [@media(max-height:820px)]:hidden"
        >
          {stats.map(s => (
            <div key={s.label} className="bg-ink-950/70 px-4 py-4 backdrop-blur-xl">
              <div className="font-display text-2xl font-bold text-gradient-static sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-white/45">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Tech marquee */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden [@media(max-height:900px)]:hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)',
        }}
      >
        <div className="flex w-max animate-marquee gap-3">
          {[...coreStack, ...coreStack].map((t, i) => (
            <span key={i} className="whitespace-nowrap font-mono text-xs text-white/30">
              {t} <span className="ml-3 text-violet-400/40">✦</span>
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default DesktopHero;
