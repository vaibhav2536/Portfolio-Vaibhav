import React from 'react';
import Background from './Background';

interface DesktopProps {
  children: React.ReactNode;
}

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <Background />
      <div className="relative h-full" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
};

export default Desktop;
