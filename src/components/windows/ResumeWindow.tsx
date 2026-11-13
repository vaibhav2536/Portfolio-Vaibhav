import React from 'react';
import { Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { resume, experiences, stats } from '../../data/portfolioData';
import { WindowPage, Reveal } from './ui';

const highlights = [
  'SDE @ Stashfin: LMS portal, SAML SSO, RBAC, Kafka on AWS',
  'Founder @ Outlynk: AI training programs with 300+ contributors',
  'Freelance AI Specialist: Terminal-Bench & SWE-bench author',
  'Built Bachatt onboarding + AI assistant Ria in under a month',
  'B.Tech CSE, IIIT Sonepat · CGPA 8.2',
];

const ResumeWindow: React.FC = () => {
  return (
    <WindowPage className="!max-w-6xl">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Summary */}
        <div className="space-y-5">
          <Reveal>
            <div className="relative mb-5 inline-flex">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-400 via-fuchsia-500 to-violet-600 opacity-60 blur-xl" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 via-fuchsia-500 to-violet-600 shadow-xl">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="eyebrow mb-2">resume.pdf</div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-white">
              The <span className="text-gradient">one-pager</span>
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              {experiences.length} roles, {stats[0].value} years and the details recruiters ask for, on a single page. Updated {resume.updated}.
            </p>
          </Reveal>

          <Reveal className="flex flex-col gap-2.5">
            <a href={resume.file} download={resume.downloadName} className="btn-primary w-full">
              <Download className="h-4 w-4" />
              Download PDF
            </a>
            <a href={resume.file} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full">
              <ExternalLink className="h-4 w-4" />
              Open in new tab
            </a>
          </Reveal>

          <Reveal className="glass-card p-5">
            <div className="eyebrow mb-3">TL;DR</div>
            <ul className="space-y-2.5">
              {highlights.map(h => (
                <li key={h} className="flex gap-2.5 text-[13px] leading-snug text-white/70">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Preview */}
        <Reveal className="hidden md:block">
          <div className="glass-card overflow-hidden p-2">
            <div className="flex items-center justify-between px-3 pb-2 pt-1">
              <span className="font-mono text-[11px] text-white/40">Preview · Vaibhav_Dinkar_Resume.pdf</span>
              <span className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
              </span>
            </div>
            <iframe
              src={`${resume.file}#view=FitH&toolbar=0&navpanes=0`}
              title="Resume preview"
              className="h-[640px] w-full rounded-xl bg-white"
            />
          </div>
        </Reveal>
      </div>
    </WindowPage>
  );
};

export default ResumeWindow;
