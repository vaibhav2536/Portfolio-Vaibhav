import React from 'react';
import { ExternalLink, Github, Play } from 'lucide-react';
import { projects } from '../../data/portfolioData';

const ProjectsWindow: React.FC = () => {
  return (
    <div className="h-full bg-gray-900 overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center sm:text-left">
            My Projects
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {project.image && (
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-36 sm:h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                    {project.title}
                  </h2>
                  
                  <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <h3 className="text-xs sm:text-sm font-semibold text-white mb-2">
                      Tech Stack:
                    </h3>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="text-xs font-medium bg-blue-900/50 text-blue-200 px-2 py-1 rounded text-center"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 sm:space-x-2 bg-green-600 hover:bg-green-700 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 flex-1 sm:flex-none justify-center"
                      >
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Live Site</span>
                      </a>
                    )}
                    
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 sm:space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 flex-1 sm:flex-none justify-center"
                      >
                        <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Demo</span>
                      </a>
                    )}
                    
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 sm:space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 flex-1 sm:flex-none justify-center"
                      >
                        <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsWindow;