import React from 'react';
import { Github, Linkedin, Twitter, Code, ExternalLink, Mail, Rocket, AtSign, Briefcase, ArrowUpRight, LucideIcon } from 'lucide-react';
import { socialLinks, personalInfo } from '../../data/portfolioData';
import { WindowPage, PageHeader, Reveal } from './ui';

const meta: Record<string, { icon: LucideIcon; gradient: string }> = {
  Github: { icon: Github, gradient: 'from-zinc-500 to-zinc-800' },
  Linkedin: { icon: Linkedin, gradient: 'from-sky-500 to-blue-700' },
  Twitter: { icon: Twitter, gradient: 'from-cyan-400 to-sky-600' },
  Code: { icon: Code, gradient: 'from-violet-500 to-purple-700' },
  Rocket: { icon: Rocket, gradient: 'from-fuchsia-500 to-violet-600' },
  Mail: { icon: Mail, gradient: 'from-rose-400 to-pink-600' },
  AtSign: { icon: AtSign, gradient: 'from-fuchsia-500 to-indigo-600' },
};

const LinksWindow: React.FC = () => (
  <WindowPage className="!max-w-3xl">
    <PageHeader
      eyebrow="connect.url"
      title={
        <>
          Let's <span className="text-gradient">talk</span>
        </>
      }
      subtitle="Hiring, a project for Outlynk, an AI training program, or just want to talk AI? My inbox is open."
    />

    <div className="grid gap-3 sm:grid-cols-2">
      {socialLinks.map(link => {
        const m = meta[link.icon] ?? { icon: ExternalLink, gradient: 'from-zinc-500 to-zinc-700' };
        const Icon = m.icon;
        return (
          <Reveal key={link.name} className="sm:last:odd:col-span-2">
            <a
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="glow-card group flex items-center gap-4 p-4"
            >
              <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${m.gradient} shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-white">{link.name}</div>
                <div className="truncate text-xs text-white/45">{link.handle}</div>
              </div>
              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </a>
          </Reveal>
        );
      })}
    </div>

    <Reveal className="mt-6 flex flex-wrap justify-center gap-3">
      <a href={`mailto:${personalInfo.email}`} className="btn-primary">
        <Mail className="h-4 w-4" /> Write to me
      </a>
      <a href={`mailto:${personalInfo.workEmail}`} className="btn-ghost">
        <Briefcase className="h-4 w-4" /> Work & Outlynk inquiries
      </a>
    </Reveal>
  </WindowPage>
);

export default LinksWindow;
