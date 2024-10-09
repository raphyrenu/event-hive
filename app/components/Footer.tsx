import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

function Footer() {
  return (
    <div className="container mx-auto px-4 flex flex-col justify-between items-center font-sans w-full bottom-1">

        {/* Logo or Brand Name */}
          <div className="mb-4 md:mb-0 flex flex-col md:flex-row lg:flex-row items-center justify-between w-screen px-5">
              <div>
          <h2 className='font-bold text-xl'>Event{' '}<span className='text-primary'>Hive</span></h2>
              </div>


        {/* Footer Links */}
        <ul className="flex space-x-6 mb-4 md:mb-0">
          <li>
            <a href="/about" className="hover:text-gray-800">About</a>
          </li>
          <li>
            <a href="/projects" className="hover:text-gray-800">Projects</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-800">Contact</a>
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://x.com/RAPHY15926" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-all duration-1000">
            <FaTwitter size={24} />
          </a>
          <a href="https://github.com/raphyrenu/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-all duration-1000">
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/raphaelrenu/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-all duration-1000">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 text-center text-gray-500">
        © {new Date().getFullYear()} Event <span className='text-primary'>Hive</span>. All rights reserved.
      </div>


    </div>
  )
}

export default Footer
