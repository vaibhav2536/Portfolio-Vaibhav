import React from 'react';
import { Download, Eye, FileText, ExternalLink } from 'lucide-react';

const ResumeWindow: React.FC = () => {
  const resumeViewUrl = "https://drive.google.com/file/d/1N-LyFrxnEv0eYtagTQYcLPzeagxZpyi5/view?usp=sharing";
  const resumeDownloadUrl = "https://drive.google.com/uc?export=download&id=1N-LyFrxnEv0eYtagTQYcLPzeagxZpyi5";

  const handleView = () => {
    window.open(resumeViewUrl, '_blank');
  };

  const handleDownload = () => {
    // Method 1: Direct navigation (more reliable for Google Drive)
    window.open(resumeDownloadUrl, '_blank');
    
    // Method 2: Fallback with temporary link (commented out but available)
    /*
    const link = document.createElement('a');
    link.href = resumeDownloadUrl;
    link.download = 'Vaibhav_Dinkar_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    */
  };

  return (
    <div className="h-full bg-gray-900 overflow-y-auto">
      <div className="p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-blue-400" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">
              Resume
            </h1>
            
            <p className="text-gray-400 mb-8">
              View or download my complete resume with detailed information about my experience, skills, and achievements.
            </p>
          </div>
          
          <div className="space-y-4 mb-8">
            <button
              onClick={handleView}
              className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-medium transition-colors duration-200"
            >
              <Eye className="w-5 h-5" />
              <span>View Resume</span>
              <ExternalLink className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-medium transition-colors duration-200"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeWindow;