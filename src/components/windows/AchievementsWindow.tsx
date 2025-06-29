import React from 'react';
import { Award, Star, Trophy, ExternalLink } from 'lucide-react';
import { achievements } from '../../data/portfolioData';

const AchievementsWindow: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'award':
        return Trophy;
      case 'certification':
        return Award;
      case 'recognition':
        return Star;
      default:
        return Star;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'award':
        return 'bg-yellow-900/20 text-yellow-400';
      case 'certification':
        return 'bg-blue-900/20 text-blue-400';
      case 'recognition':
        return 'bg-purple-900/20 text-purple-400';
      default:
        return 'bg-gray-900/20 text-gray-400';
    }
  };

  return (
    <div className="h-full bg-gray-900 overflow-y-auto">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">
            Achievements & Certifications
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => {
              const Icon = getIcon(achievement.type);
              const colorClasses = getColorClasses(achievement.type);
              
              return (
                <div
                  key={achievement.id}
                  className="bg-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-semibold text-white">
                          {achievement.title}
                        </h2>
                        <span className="text-sm font-medium text-gray-400">
                          {achievement.date}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 mb-3">
                        {achievement.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colorClasses}`}>
                          {achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
                        </span>
                        
                        {(achievement as any).link && (
                          <a
                            href={(achievement as any).link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm font-medium"
                          >
                            <span>View</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsWindow;