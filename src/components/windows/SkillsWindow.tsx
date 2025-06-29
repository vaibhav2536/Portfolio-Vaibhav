import React from 'react';
import { Code, Database, Cloud, Cpu, Users, Lightbulb } from 'lucide-react';
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
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">
                Technical Skills
              </h1>
            </div>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise across different domains
            </p>
          </div>
          
          <div className="space-y-8">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <div
                  key={index}
                  className={`${category.bgColor} ${category.borderColor} border-2 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}
                >
                  <div className="flex items-center mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {category.title}
                    </h2>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="bg-gray-800 px-4 py-3 rounded-xl border border-gray-700 hover:shadow-md transition-all duration-200 hover:border-gray-600"
                      >
                        <span className="text-gray-200 font-medium text-sm">
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