import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';

interface EventCardProps {
  title: string;
  venue: string;
  author: string; // Host
  date: string;   // Date and time information
  imageUrl: string; // Image URL for the event
  avatars?: string[]; // List of avatar URLs (if any)
  eventId: string; // Add an eventId prop to uniquely identify the event
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, venue, author, date, imageUrl, eventId, description }) => {
  const formattedImageUrl = imageUrl && imageUrl.startsWith('https')
    ? imageUrl
    : `https://eventhive-unyb.onrender.com${imageUrl || ''}`;

  const [user, setUser] = useState<{ isAdmin: boolean } | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null); // For closing popup when clicking outside

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false); // Close popup when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Lock scroll when popup is open
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scrolling when component unmounts
    };
  }, [showPopup]);

  if (!user) return null;

  return (
    <div>
      {/* Event card */}
          <div key={eventId} className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-96 px-3 pt-3 mx-auto transform transition-all hover:scale-105 duration-300">
        <div className="relative w-full h-48">
                  <Image
                      key={eventId}
            src={formattedImageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="object-center rounded-2xl lg:max-h-48 min-h-48"
            onError={(e) => {
              e.currentTarget.src = "/event-image-placeholder.png";
            }}
          />
          <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
            <FaHeart className="text-primary" />
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold capitalize text-primary">{title}</h2>
          <p className="text-gray-600 capitalize">Venue: {venue}</p>
          <p className="text-gray-600 capitalize font-semibold">{date}</p>

          {/* View Button */}
          <button
            className="mt-4 bg-primary  text-white py-2 px-4 rounded hover:bg-primary-dark"
            onClick={() => setShowPopup(true)}
          >
            View Details
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 w-full h-full bg-background text-foreground bg-opacity-50 z-50 flex items-center justify-center">
          <div ref={popupRef} className="bg-background text-2xl min-w-full min-h-full lg:w-1/2  p-8 relative rounded-lg shadow-lg overflow-y-auto">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-primary"
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>

            {/* Popup content */}
                      <div className="flex flex-col items-center capitalize">
                      <div className="text-left w-full max-w-xl">
                      <h2 className="text-5xl text-primary font-bold mb-4">{title}</h2>
              <Image
                src={formattedImageUrl}
                alt={title}
                                  width={500}

                height={300}
                className="rounded-lg shadow-lg mb-6 max-h-96 min-h-96"
                objectFit="cover"
              />


                <p className="text-gray-600 mb-2"><strong className='text-white'>Venue:</strong> {venue}</p>
                <p className="text-gray-600 mb-2"><strong className='text-white'>Host:</strong> {author}</p>
                <p className="text-gray-600 mb-2"><strong className='text-white'>Date:</strong> {date}</p>
                <p className="text-gray-600 mb-6"><strong className='text-white'>Description:</strong> {description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
