import React from 'react';
import Link from 'next/link';

interface EventCardProps {
  title: string;
  author: string;
  date: string;
  imageUrl: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, author, date, imageUrl }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <img className="rounded-lg mb-4" src={imageUrl} alt={title} />
      <h3 className="text-xl font-semibold">
        <Link href={`/events/${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </Link>
      </h3>
      <p className="text-gray-400">{author}</p>
      <p className="text-gray-500">{date}</p>
      <Link href={`/register/${title.toLowerCase().replace(/\s+/g, '-')}`}>
        <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded">
          Register
        </button>
      </Link>
    </div>
  );
};

export default EventCard;
