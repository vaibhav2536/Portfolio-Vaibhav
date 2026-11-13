import React, { useState } from 'react';
import { MapPin, Mail, AtSign, Phone, GraduationCap, Globe, Check, Copy, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo, education, stats, currentlyDoing } from '../../data/portfolioData';
import { WindowPage, Reveal } from './ui';

const AboutWindow: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(email);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const contacts = [
    { icon: MapPin, label: personalInfo.location },
    { icon: Phone, label: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/-/g, '')}` },
    { icon: Globe, label: 'outlynk.in', href: personalInfo.website },
  ];

  return (
    <WindowPage>
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Left: portrait card */}
        <Reveal className="md:sticky md:top-0 md:self-start">
          <div className="glass-card overflow-hidden p-2">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-xl">
              <motion.img
                src={personalInfo.photo}
                alt={personalInfo.name}
                className="h-full w-full object-cover"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-400/15 mix-blend-overlay" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-2 py-0.5 text-[10px] font-medium text-emerald-200 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  {personalInfo.availability}
                </div>
                <h2 className="font-display text-2xl font-bold leading-tight text-white">{personalInfo.name}</h2>
                <p className="text-sm text-white/70">{personalInfo.title}</p>
              </div>
            </div>

            <div className="space-y-1 p-3">
              {[
                { email: personalInfo.email, icon: Mail, title: 'Personal email: click to copy' },
                { email: personalInfo.workEmail, icon: AtSign, title: 'Work email (Outlynk): click to copy' },
              ].map(({ email, icon: Icon, title }) => (
                <button
                  key={email}
                  type="button"
                  title={title}
                  onClick={() => copyEmail(email)}
                  className="group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <Icon className="h-4 w-4 flex-shrink-0 text-violet-300" />
                  <span className="min-w-0 flex-1 truncate">{email}</span>
                  {copied === email ? (
                    <Check className="h-3.5 w-3.5 flex-shrink-0 text-emerald-300" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
                  )}
                </button>
              ))}
              {contacts.map(({ icon: Icon, label, href }) => {
                const inner = (
                  <>
                    <Icon className="h-4 w-4 flex-shrink-0 text-violet-300" />
                    <span className="truncate">{label}</span>
                  </>
                );
                const cls = 'flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white';
                return href ? (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={cls}>
                    {inner}
                  </a>
                ) : (
                  <div key={label} className={cls}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Right: story */}
        <div className="min-w-0 space-y-6">
          <Reveal>
            <div className="eyebrow mb-2">About me</div>
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-[40px]">
              I build software that <span className="text-gradient">ships</span>, lead teams that deliver, and help AI labs make their models better.
            </h1>
          </Reveal>

          <Reveal className="flex flex-wrap gap-2">
            {personalInfo.roles.slice(0, 3).map(r => (
              <span key={r} className="chip">
                <Sparkles className="h-3 w-3 text-fuchsia-300" />
                {r}
              </span>
            ))}
          </Reveal>

          <Reveal className="space-y-4 text-[15px] leading-relaxed text-white/65">
            {personalInfo.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          <Reveal className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map(s => (
              <div key={s.label} className="glow-card p-4">
                <div className="font-display text-3xl font-bold text-gradient-static">{s.value}</div>
                <div className="mt-1 text-[11px] uppercase leading-snug tracking-wider text-white/45">{s.label}</div>
              </div>
            ))}
          </Reveal>

          <Reveal className="glass-card p-5">
            <div className="eyebrow mb-4 !text-emerald-300/80">Currently</div>
            <div className="grid gap-4 sm:grid-cols-3">
              {currentlyDoing.map(c => (
                <div key={c.label} className="border-l-2 border-violet-400/40 pl-3">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/35">{c.label}</div>
                  <div className="mt-0.5 text-sm text-white/85">{c.value}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="glow-card flex items-start gap-4 p-5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 shadow-lg">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="eyebrow mb-1">Education</div>
              <h3 className="font-semibold text-white">{education.degree}</h3>
              <p className="text-sm text-white/60">{education.institution}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="chip">{education.duration}</span>
                <span className="chip">CGPA {education.cgpa}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </WindowPage>
  );
};

export default AboutWindow;
