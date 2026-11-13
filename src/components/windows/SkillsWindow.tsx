import React from 'react';
import { Code2, Server, Cloud, Cpu, Users, Brain, LucideIcon } from 'lucide-react';
import { technicalSkills } from '../../data/portfolioData';
import { WindowPage, PageHeader, Reveal } from './ui';

interface Category {
  title: string;
  blurb: string;
  icon: LucideIcon;
  skills: string[];
  gradient: string;
  dot: string;
}

const categories: Category[] = [
  {
    title: 'Frontend',
    blurb: 'Interfaces that feel fast: web, WebView and native.',
    icon: Code2,
    skills: technicalSkills.frontend,
    gradient: 'from-sky-500 to-blue-600',
    dot: 'bg-sky-400',
  },
  {
    title: 'Backend',
    blurb: 'BFFs, event pipelines, auth and permissions.',
    icon: Server,
    skills: technicalSkills.backend,
    gradient: 'from-emerald-500 to-teal-600',
    dot: 'bg-emerald-400',
  },
  {
    title: 'AI & LLM',
    blurb: 'Evaluation, prompting, data and building with LLMs.',
    icon: Brain,
    skills: technicalSkills.aiLlm,
    gradient: 'from-fuchsia-500 to-violet-600',
    dot: 'bg-fuchsia-400',
  },
  {
    title: 'Cloud, DevOps & Testing',
    blurb: 'Shipping to AWS with confidence and coverage.',
    icon: Cloud,
    skills: technicalSkills.cloudDevOps,
    gradient: 'from-amber-500 to-orange-600',
    dot: 'bg-amber-400',
  },
  {
    title: 'Core CS',
    blurb: 'The fundamentals underneath everything.',
    icon: Cpu,
    skills: technicalSkills.coreCS,
    gradient: 'from-rose-500 to-pink-600',
    dot: 'bg-rose-400',
  },
  {
    title: 'Leadership',
    blurb: 'Running teams of 300+ contributors and client delivery.',
    icon: Users,
    skills: technicalSkills.leadership,
    gradient: 'from-indigo-500 to-purple-600',
    dot: 'bg-indigo-400',
  },
];

const SkillsWindow: React.FC = () => {
  const total = categories.reduce((n, c) => n + c.skills.length, 0);

  return (
    <WindowPage>
      <PageHeader
        eyebrow="skills.json"
        title={
          <>
            The <span className="text-gradient">toolkit</span>
          </>
        }
        subtitle={`${total} tools and practices across ${categories.length} domains, from pixel-level React to Kafka pipelines on AWS and AI evaluation.`}
      />

      {/* Terminal card */}
      <Reveal className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-black/50 font-mono text-[12.5px] shadow-inner">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 text-[11px] text-white/30">zsh · ~/vaibhav</span>
        </div>
        <div className="space-y-1 px-4 py-3 leading-6">
          <div>
            <span className="text-emerald-400">➜</span> <span className="text-cyan-300">~</span>{' '}
            <span className="text-white/85">cat skills.json | jq '.focus'</span>
          </div>
          <div className="text-white/60">[</div>
          <div className="pl-4 text-amber-200">"Full-stack product engineering (React · TypeScript · Node)",</div>
          <div className="pl-4 text-amber-200">"Event-driven systems & auth on AWS (Kafka · ECS · SAML · RBAC)",</div>
          <div className="pl-4 text-amber-200">"AI & LLM work: evaluation, prompt engineering, data annotation, RAG"</div>
          <div className="text-white/60">]</div>
          <div>
            <span className="text-emerald-400">➜</span> <span className="text-cyan-300">~</span>{' '}
            <span className="inline-block h-4 w-2 translate-y-[3px] animate-blink bg-white/70" />
          </div>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <Reveal key={cat.title} className="glow-card group overflow-hidden p-5">
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${cat.gradient} opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-30`}
              />
              <div className="mb-4 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} shadow-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-lg font-semibold text-white">{cat.title}</h2>
                  <p className="truncate text-xs text-white/45">{cat.blurb}</p>
                </div>
                <span className="ml-auto font-mono text-xs text-white/30">{String(cat.skills.length).padStart(2, '0')}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map(skill => (
                  <span key={skill} className="chip">
                    <span className={`h-1.5 w-1.5 rounded-full ${cat.dot}`} />
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </WindowPage>
  );
};

export default SkillsWindow;
