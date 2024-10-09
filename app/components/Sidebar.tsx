// components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-900 p-5">
      <h1 className="text-xl font-bold mb-10">Event Hive</h1>
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard" className="text-gray-400 hover:text-white">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/dashboard/events" className="text-gray-400 hover:text-white">
            Events
          </Link>
        </li>
        <li>
          <Link href="#" className="text-gray-400 hover:text-white">
            Messages
          </Link>
        </li>
        <li>
          <Link href="#" className="text-gray-400 hover:text-white">
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
