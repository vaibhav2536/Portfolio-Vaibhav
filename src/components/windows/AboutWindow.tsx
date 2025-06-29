import React from 'react';
import { MapPin, Mail, Phone, GraduationCap } from 'lucide-react';
import { personalInfo, education } from '../../data/portfolioData';

const AboutWindow: React.FC = () => {
  return (
    <div className="h-full bg-gray-900 overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 sm:mb-6 shadow-lg border-4 border-gray-700 object-cover"
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {personalInfo.name}
            </h1>
            <p className="text-lg sm:text-xl text-blue-400 mb-4">
              {personalInfo.title}
            </p>
            <div className="flex items-center justify-center space-x-3 sm:space-x-6 text-gray-400 mb-4 sm:mb-6 flex-wrap gap-y-2">
              <div className="flex items-center space-x-2 text-sm sm:text-base">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">{personalInfo.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm sm:text-base">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">{personalInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm sm:text-base">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">{personalInfo.phone}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              About Me
            </h2>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              {personalInfo.bio}
            </p>
          </div>

          <div className="bg-blue-900/20 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-center mb-3 sm:mb-4">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mr-2 sm:mr-3 flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                Education
              </h2>
            </div>
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-medium text-white">
                {education.degree}
              </h3>
              <p className="text-blue-400 font-medium text-sm sm:text-base">
                {education.institution}
              </p>
              <div className="flex items-center justify-between text-gray-400 text-sm sm:text-base flex-wrap gap-2">
                <span>{education.duration}</span>
                <span className="font-semibold">CGPA: {education.cgpa}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;