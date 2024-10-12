import React from 'react';
import Image from 'next/image';

interface EventCardProps {
  title: string;
  venue: string;
  author: string; // Using 'author' for host
  date: string;   // Date and time information
  imageUrl: string; // Image URL for the event
}

const EventCard: React.FC<EventCardProps> = ({ title, venue, author, date, imageUrl }) => {
  // Use the absolute URL for the image
  const formattedImageUrl = imageUrl.startsWith('http') ? imageUrl : `http://localhost:5000${imageUrl}`;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Image
        src={formattedImageUrl} // Ensure the path is correct
        alt={title}
        width={500}
        height={300}
        className="w-full h-48 object-cover"
        onError={(e) => {
          // Fallback to a placeholder image if the image fails to load
          e.currentTarget.src = "/event-image-placeholder.png"; // Make sure this image exists in the public folder
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600">{venue}</p>
        <p className="text-gray-600">{date}</p>
        <p className="text-gray-600">Hosted by: {author}</p>
      </div>
    </div>
  );
};

export default EventCard;
