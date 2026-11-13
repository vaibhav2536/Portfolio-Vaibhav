import React from 'react';
import { Trophy, BadgeCheck, Star, Zap, ArrowUpRight, LucideIcon } from 'lucide-react';
import { achievements } from '../../data/portfolioData';
import { Achievement } from '../../types';
import { WindowPage, PageHeader, Reveal } from './ui';

const typeMeta: Record<Achievement['type'], { icon: LucideIcon; label: string; gradient: string; text: string }> = {
  award: { icon: Trophy, label: 'Award', gradient: 'from-amber-400 to-orange-600', text: 'text-amber-200' },
  certification: { icon: BadgeCheck, label: 'Certification', gradient: 'from-sky-400 to-blue-600', text: 'text-sky-200' },
  milestone: { icon: Zap, label: 'Milestone', gradient: 'from-emerald-400 to-teal-600', text: 'text-emerald-200' },
  recognition: { icon: Star, label: 'Recognition', gradient: 'from-violet-400 to-fuchsia-600', text: 'text-violet-200' },
};

const CardLink: React.FC<{ href?: string; className: string; children: React.ReactNode }> = ({ href, className, children }) =>
  href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${className} cursor-pointer`}>
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  );

const AchievementsWindow: React.FC = () => {
  const featured = achievements.filter(a => a.featured);
  const rest = achievements.filter(a => !a.featured);

  return (
    <WindowPage>
      <PageHeader
        eyebrow="wins.md"
        title={
          <>
            Achievements & <span className="text-gradient">certifications</span>
          </>
        }
        subtitle="Contests, certifications and milestones, plus some leadership from my campus days."
      />

      {/* Featured */}
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        {featured.map(a => {
          const meta = typeMeta[a.type];
          const Icon = meta.icon;
          return (
            <Reveal key={a.id}>
              <CardLink href={a.link} className="glow-card group relative block h-full overflow-hidden p-6">
                <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${meta.gradient} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40`} />
                <Icon className="pointer-events-none absolute -bottom-6 -right-4 h-36 w-36 text-white/[0.04] transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />
                <div className="relative">
                  <div className="mb-5 flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-mono text-xs text-white/40">{a.date}</span>
                  </div>
                  <div className={`mb-1 font-mono text-[10px] uppercase tracking-[0.2em] ${meta.text}`}>Featured · {meta.label}</div>
                  <h2 className="font-display text-2xl font-bold text-white">{a.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{a.description}</p>
                  {a.link && (
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-violet-200">
                      View proof <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  )}
                </div>
              </CardLink>
            </Reveal>
          );
        })}
      </div>

      {/* The rest */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map(a => {
          const meta = typeMeta[a.type];
          const Icon = meta.icon;
          return (
            <Reveal key={a.id}>
              <CardLink href={a.link} className="glow-card group flex h-full flex-col p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${meta.gradient}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  {a.link ? (
                    <ArrowUpRight className="h-4 w-4 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  ) : (
                    <span className={`font-mono text-[10px] uppercase tracking-wider ${meta.text} opacity-70`}>{meta.label}</span>
                  )}
                </div>
                <h3 className="font-semibold leading-snug text-white">{a.title}</h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-white/55">{a.description}</p>
                <div className="mt-3 font-mono text-[11px] text-white/35">{a.date}</div>
              </CardLink>
            </Reveal>
          );
        })}
      </div>
    </WindowPage>
  );
};

export default AchievementsWindow;
