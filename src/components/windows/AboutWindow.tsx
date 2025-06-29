import React from 'react';
import { MapPin, Mail, Phone, GraduationCap } from 'lucide-react';
import { personalInfo, education } from '../../data/portfolioData';

const AboutWindow: React.FC = () => {
  return (
    <div className="h-full bg-gray-900 overflow-y-auto">
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg border-4 border-gray-700 object-cover"
            />
            <h1 className="text-3xl font-bold text-white mb-2">
              {personalInfo.name}
            </h1>
            <p className="text-xl text-blue-400 mb-4">
              {personalInfo.title}
            </p>
            <div className="flex items-center justify-center space-x-6 text-gray-400 mb-6 flex-wrap">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{personalInfo.phone}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              About Me
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {personalInfo.bio}
            </p>
          </div>

          <div className="bg-blue-900/20 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <GraduationCap className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-2xl font-semibold text-white">
                Education
              </h2>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white">
                {education.degree}
              </h3>
              <p className="text-blue-400 font-medium">
                {education.institution}
              </p>
              <div className="flex items-center justify-between text-gray-400">
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