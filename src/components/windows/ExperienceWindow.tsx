import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { experiences } from '../../data/portfolioData';
import { WindowPage, PageHeader, Reveal, RichText, FilterTabs } from './ui';

const filters = ['All', 'Full-time', 'Founder', 'Freelance', 'Internship'] as const;
type Filter = (typeof filters)[number];

const typeStyles: Record<string, string> = {
  'Full-time': 'border-sky-400/30 bg-sky-400/10 text-sky-200',
  Founder: 'border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200',
  Freelance: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  Internship: 'border-indigo-400/30 bg-indigo-400/10 text-indigo-200',
};

const ExperienceWindow: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('All');
  const list = useMemo(() => (filter === 'All' ? experiences : experiences.filter(e => e.type === filter)), [filter]);

  return (
    <WindowPage>
      <PageHeader
        eyebrow="experience.log"
        title={
          <>
            Where I've <span className="text-gradient">shipped</span>
          </>
        }
        subtitle="Fintech platforms, AI products, a founder journey and years of freelance AI work with frontier labs."
        right={<FilterTabs options={filters} value={filter} onChange={setFilter} layoutId="exp-filter" />}
      />

      <div className="relative">
        {/* Timeline rail */}
        <div className="absolute bottom-4 left-[19px] top-4 hidden w-px bg-gradient-to-b from-violet-400/60 via-fuchsia-400/30 to-cyan-400/10 sm:block" />

        <motion.div layout className="space-y-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map(exp => (
              <motion.article
                key={exp.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                className="relative sm:pl-14"
              >
                {/* Node */}
                <div className="absolute left-0 top-5 hidden sm:block">
                  <div
                    className={`relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${exp.accent} font-display text-sm font-bold text-white shadow-lg`}
                  >
                    {exp.company.charAt(0)}
                    {exp.current && (
                      <span className="absolute -right-1 -top-1 flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-ink-900 bg-emerald-400" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="glow-card p-5 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-display text-lg font-semibold text-white sm:text-xl">{exp.title}</h2>
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${typeStyles[exp.type]}`}>
                          {exp.type}
                        </span>
                        {exp.current && (
                          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-200">
                            Now
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-[15px] font-medium text-white/70">
                        {exp.link ? (
                          <a href={exp.link} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 hover:text-white">
                            {exp.company}
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                          </a>
                        ) : (
                          exp.company
                        )}
                      </div>
                    </div>
                    <span className="inline-flex flex-shrink-0 items-center gap-1.5 self-start rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-white/60">
                      <Calendar className="h-3 w-3" />
                      {exp.duration}
                    </span>
                  </div>

                  <p className="mt-3 text-sm italic text-white/50">{exp.summary}</p>

                  <ul className="mt-4 space-y-2.5">
                    {exp.achievements.map((a, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-white/65">
                        <span className={`mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br ${exp.accent}`} />
                        <RichText text={a} />
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {exp.tech.map(t => (
                      <span key={t} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-white/55">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Reveal className="mt-8 text-center font-mono text-xs text-white/30">— EOF · {experiences.length} entries —</Reveal>
    </WindowPage>
  );
};

export default ExperienceWindow;
