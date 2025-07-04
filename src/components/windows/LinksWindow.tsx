import React from 'react';
import { Github, Linkedin, Twitter, Code, ExternalLink } from 'lucide-react';
import { socialLinks } from '../../data/portfolioData';

const LinksWindow: React.FC = () => {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Github,
      Linkedin,
      Twitter,
      Code
    };
    return icons[iconName] || ExternalLink;
  };

  const getColorClasses = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github':
        return 'bg-gray-500 hover:bg-gray-600 text-white';
      case 'linkedin':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'twitter':
        return 'bg-sky-500 hover:bg-sky-600 text-white';
      case 'codelio':
        return 'bg-purple-600 hover:bg-purple-700 text-white';
      default:
        return 'bg-gray-600 hover:bg-gray-700 text-white';
    }
  };

  return (
    <div className="h-full bg-gray-900 overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
            Connect With Me
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {socialLinks.map((link) => {
              const Icon = getIcon(link.icon);
              const colorClasses = getColorClasses(link.name);
              
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${colorClasses} p-4 sm:p-6 rounded-lg transition-colors duration-200 flex items-center space-x-3 sm:space-x-4 group`}
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg font-semibold">{link.name}</h2>
                    <p className="text-xs sm:text-sm opacity-90 group-hover:opacity-100 truncate">
                      {link.url.replace('https://', '').replace('http://', '')}
                    </p>
                  </div>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-70 group-hover:opacity-100 flex-shrink-0" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksWindow;