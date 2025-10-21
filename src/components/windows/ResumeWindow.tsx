import React from 'react';
import { Download, Eye, FileText, ExternalLink } from 'lucide-react';

const ResumeWindow: React.FC = () => {
  const resumeViewUrl = "https://drive.google.com/file/d/1LfrNCwfazfs-mPy5tfEBKeUZtK5akFte/view?usp=sharing";
  const resumeDownloadUrl = "https://drive.google.com/uc?export=download&id=1LfrNCwfazfs-mPy5tfEBKeUZtK5akFte";

  const handleView = () => {
    window.open(resumeViewUrl, '_blank');
  };

  const handleDownload = () => {
    window.open(resumeDownloadUrl, '_blank');
  };

  return (
    <div className="h-full bg-gray-900 overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400" />
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              Resume
            </h1>
            
            <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base px-4">
              View or download my complete resume with detailed information about my experience, skills, and achievements.
            </p>
          </div>
          
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 px-4">
            <button
              onClick={handleView}
              className="w-full flex items-center justify-center space-x-2 sm:space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>View Resume</span>
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center space-x-2 sm:space-x-3 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeWindow;