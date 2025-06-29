import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { experiences } from '../../data/portfolioData';

const ExperienceWindow: React.FC = () => {
  return (
    <div className="h-full bg-gray-900 overflow-y-auto">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">
            Work Experience
          </h1>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="relative bg-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
              >
                {index < experiences.length - 1 && (
                  <div className="absolute left-6 top-20 w-0.5 h-16 bg-blue-800" />
                )}
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-400" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-3">
                      <h2 className="text-xl font-semibold text-white mb-1">
                        {exp.title}
                      </h2>
                      <h3 className="text-lg font-medium text-gray-300 mb-2">
                        {exp.company}
                      </h3>
                      <span className="text-sm font-medium text-blue-400 bg-blue-900/50 px-3 py-1 rounded-full">
                        {exp.duration}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 mb-4">
                      {exp.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-white">
                        Key Achievements:
                      </h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-gray-400">
                            <ChevronRight className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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

export default ExperienceWindow;