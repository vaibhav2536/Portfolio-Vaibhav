import React, { useState } from 'react';
import { ExternalLink, Github, Play } from 'lucide-react';
import { projects } from '../../data/portfolioData';
import { Project } from '../../types';
import { WindowPage, PageHeader, Reveal } from './ui';

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);
  const long = project.description.length > 180;

  return (
    <Reveal className="glow-card group flex flex-col overflow-hidden">
      {project.image && (
        <div className="relative h-44 overflow-hidden sm:h-52">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
          <span className="absolute left-4 top-4 rounded-md border border-white/15 bg-black/40 px-2 py-0.5 font-mono text-[11px] text-white/80 backdrop-blur-md">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-display text-lg font-semibold text-white">{project.title}</h2>
        <p className={`mt-2 text-sm leading-relaxed text-white/55 ${expanded ? '' : 'line-clamp-3'}`}>{project.description}</p>
        {long && (
          <button
            type="button"
            onClick={() => setExpanded(e => !e)}
            className="mt-1 self-start text-xs font-medium text-violet-300 hover:text-violet-200"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.map(tech => (
            <span key={tech} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-white/55">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !px-4 !py-2 !text-xs">
              <ExternalLink className="h-3.5 w-3.5" /> Live
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 !text-xs">
              <Play className="h-3.5 w-3.5" /> Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 !text-xs">
              <Github className="h-3.5 w-3.5" /> Code
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
};

const ProjectsWindow: React.FC = () => (
  <WindowPage className="!max-w-6xl">
    <PageHeader
      eyebrow="~/projects"
      title={
        <>
          Things I've <span className="text-gradient">built</span>
        </>
      }
      subtitle="Side projects across full-stack web, real-time systems and computer vision."
    />
    <div className="grid gap-5 md:grid-cols-2">
      {projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} />
      ))}
    </div>
  </WindowPage>
);

export default ProjectsWindow;
