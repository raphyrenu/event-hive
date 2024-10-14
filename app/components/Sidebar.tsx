"use client";
// app/components/Sidebar.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiGridAlt, BiSend } from 'react-icons/bi';
import { FiTv, FiUser, FiLogOut, FiMenu } from 'react-icons/fi'; // Added FiMenu for the hamburger icon

// Sidebar component
const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  // State to store user information
  const [user, setUser] = useState<{ isAdmin: boolean } | null>(null);
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch user from local storage
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    } else {
      // Redirect to login page if not authenticated
      router.push('/login');
    }
  }, [router]);

  // Logout function
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Redirect to login or homepage after logout
    router.push('/login');
  };

  // If no user is logged in, don't show the sidebar
  if (!user) return null;

  return (
    <div>
      {/* Hamburger menu button for small and medium screens */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden p-4">
        <FiMenu size={25} />
      </button>

      {/* Sidebar */}
      <div className={`hidden h-full fixed lg:w-96 md:w-60 bg-foreground md:flex lg:flex flex-col px-10 pt-10 shadow-xl shadow-primary rounded-lg ${isSidebarOpen ? 'block' : 'hidden lg:block md:block'}`}>
        <h1 className="font-bayon font-extrabold mb-8 text-3xl text-gray-500">
          Event <span className="text-primary2">Hive</span>
        </h1>

        <div className='w-full flex flex-col h-full py-12 font-bold text-xl'>
          {/* Dashboard */}
          <Link href="/dashboard" className={`flex flex-row items-center min-w-60 mb-4 py-4 px-4 rounded-md hover:bg-primary2 hover:text-white transition-all duration-500 ${pathname === '/dashboard' ? 'bg-primary2 text-foreground' : 'text-background'}`}>
            <BiGridAlt size={25} className='inline mr-4' />
            <p className='inline'>Dashboard</p>
          </Link>

          {/* Events */}
          <Link href="/dashboard/events" className={`flex flex-row items-center min-w-60 px-4 rounded-md transition-all duration-500 hover:bg-primary2 py-4 mb-4 hover:text-white ${pathname === '/dashboard/events' ? 'bg-primary2 text-foreground' : 'text-background'}`}>
            <FiTv size={25} className='inline mr-4' />
            <p className='inline'>Events</p>
          </Link>

          {/* Create Event (only for admins) */}
          {user.isAdmin && (
            <Link href="/dashboard/create-event" className={`flex flex-row items-center min-w-60 px-4 rounded-md transition-all duration-500 hover:bg-primary2 py-4 mb-4 hover:text-white ${pathname === '/dashboard/create-event' ? 'bg-primary2 text-foreground' : 'text-background'}`}>
              <FiUser size={25} className='inline mr-4' />
              <p className='inline'>Create Event</p>
            </Link>
          )}

          {/* Messages */}
          <Link href="/dashboard/messages" className={`flex flex-row items-center min-w-60 px-4 rounded-md transition-all duration-500 hover:bg-primary2 py-4 mb-4 text-background hover:text-white ${pathname === '/dashboard/messages' ? 'bg-gray-800' : 'text-background'}`}>
            <BiSend size={25} className='inline mr-4' />
            <p className='inline'>Messages</p>
          </Link>

          {/* Profile */}
          <Link href="/dashboard/profile" className={`flex flex-row items-center min-w-60 px-4 rounded-md transition-all duration-500 hover:bg-primary2 py-4 mb-4 text-background hover:text-white ${pathname === '/dashboard/profile' ? 'bg-gray-800' : 'text-background'}`}>
            <FiUser size={25} className='inline mr-4' />
            <p className='inline'>Profile</p>
          </Link>

          {/* Spacer to push logout button to the bottom */}
          <div className="flex-grow"></div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex flex-row items-center min-w-60 px-4 rounded-md transition-all duration-500 py-4 text-background">
            <FiLogOut size={25} className="inline mr-4" />
            <p className="inline">Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
