import React from 'react';
import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 160, damping: 20 } },
};

/** Page wrapper used by every window; staggers its direct `Reveal` children in. */
export const WindowPage: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div
    variants={stagger}
    initial="hidden"
    animate="show"
    className={`mx-auto w-full max-w-5xl px-4 py-6 sm:px-8 sm:py-8 ${className}`}
  >
    {children}
  </motion.div>
);

export const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <motion.div variants={rise} className={className}>
    {children}
  </motion.div>
);

export const PageHeader: React.FC<{ eyebrow: string; title: React.ReactNode; subtitle?: React.ReactNode; right?: React.ReactNode }> = ({
  eyebrow,
  title,
  subtitle,
  right,
}) => (
  <Reveal className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div className="min-w-0">
      <div className="eyebrow mb-2">{eyebrow}</div>
      <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-[15px]">{subtitle}</p>}
    </div>
    {right && <div className="flex-shrink-0">{right}</div>}
  </Reveal>
);

/** Renders `**bold**` segments as highlighted text. */
export const RichText: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
  <span className={className}>
    {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      )
    )}
  </span>
);

/** Segmented filter pills with an animated active background. */
export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
  layoutId,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  layoutId: string;
}) {
  return (
    <div className="flex max-w-full gap-1 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03] p-1">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`relative whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            value === opt ? 'text-white' : 'text-white/50 hover:text-white/80'
          }`}
        >
          {value === opt && (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/40 to-fuchsia-500/30 ring-1 ring-white/15"
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
          )}
          <span className="relative">{opt}</span>
        </button>
      ))}
    </div>
  );
}
