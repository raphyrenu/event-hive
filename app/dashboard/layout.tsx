
import Sidebar from '../components/Sidebar';
import React from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 p-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
