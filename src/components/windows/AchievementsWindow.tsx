import React from "react";
import { Award, Star, Trophy, ExternalLink } from "lucide-react";
import { achievements } from "../../data/portfolioData";

const AchievementsWindow: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "award":
        return Trophy;
      case "certification":
        return Award;
      case "recognition":
        return Star;
      default:
        return Star;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case "award":
        return "bg-yellow-900/20 text-yellow-400";
      case "certification":
        return "bg-blue-900/20 text-blue-400";
      case "recognition":
        return "bg-purple-900/20 text-purple-400";
      default:
        return "bg-gray-900/20 text-gray-400";
    }
  };

  return (
    <div className="h-full bg-gray-900 overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center sm:text-left">Achievements & Certifications</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {achievements.map(achievement => {
              const Icon = getIcon(achievement.type);
              const colorClasses = getColorClasses(achievement.type);

              return (
                <div key={achievement.id} className="bg-gray-800 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${colorClasses} flex-shrink-0`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2 flex-col sm:flex-row gap-2">
                        <h2 className="text-base sm:text-lg font-semibold text-white">{achievement.title}</h2>
                        <span className="text-xs sm:text-sm font-medium text-gray-400 flex-shrink-0">{achievement.date}</span>
                      </div>

                      <p className="text-gray-400 mb-3 text-sm sm:text-base">{achievement.description}</p>

                      <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colorClasses} order-2 sm:order-1`}>{achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}</span>

                        {achievement.link && (
                          <a href={achievement.link} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-medium order-1 sm:order-2">
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
