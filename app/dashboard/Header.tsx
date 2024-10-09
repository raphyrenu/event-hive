import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-400">{subtitle}</p>
      <div className="mt-4 flex space-x-4">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded">
          Discover now
        </button>
        <button className="bg-transparent border border-gray-500 text-gray-400 py-2 px-4 rounded">
          Watch video
        </button>
      </div>
    </div>
  );
};

export default Header;
