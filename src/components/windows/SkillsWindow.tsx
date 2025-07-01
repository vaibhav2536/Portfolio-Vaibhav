import React from 'react';
import { Code, Database, Cloud, Cpu, Users, Lightbulb, Brain } from 'lucide-react';
import { technicalSkills } from '../../data/portfolioData';

const SkillsWindow: React.FC = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Code,
      skills: technicalSkills.frontend,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-900/10",
      borderColor: "border-blue-800"
    },
    {
      title: "Backend Development",
      icon: Database,
      skills: technicalSkills.backend,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-900/10",
      borderColor: "border-green-800"
    },
    {
      title: "Data Science & ML",
      icon: Brain,
      skills: technicalSkills.dataScience,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-900/10",
      borderColor: "border-indigo-800"
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      skills: technicalSkills.cloudDevOps,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-900/10",
      borderColor: "border-purple-800"
    },
    {
      title: "Core Computer Science",
      icon: Cpu,
      skills: technicalSkills.coreCS,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-900/10",
      borderColor: "border-orange-800"
    },
    {
      title: "Soft Skills",
      icon: Users,
      skills: technicalSkills.softSkills,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-900/10",
      borderColor: "border-pink-800"
    }
  ];

  return (
    <div className="h-full bg-gray-900 overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center mb-4 sm:mb-6 flex-col sm:flex-row">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
                <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Technical Skills
              </h1>
            </div>
            <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4">
              A comprehensive overview of my technical expertise across different domains
            </p>
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <div
                  key={index}
                  className={`${category.bgColor} ${category.borderColor} border-2 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}
                >
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r ${category.color} rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg flex-shrink-0`}>
                      <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                      {category.title}
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="bg-gray-800 px-2 sm:px-3 lg:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-gray-700 hover:shadow-md transition-all duration-200 hover:border-gray-600 text-center"
                      >
                        <span className="text-gray-200 font-medium text-xs sm:text-sm lg:text-base block truncate">
                          {skill}
                        </span>
                      </div>
                    ))}
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

export default SkillsWindow;