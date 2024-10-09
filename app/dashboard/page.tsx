import React from 'react';
import Header from './Header';
import EventCard from '../components/EventCard';

const EventsPage: React.FC = () => {
  return (
    <div>
      <Header
        title="Discover and Experience Extraordinary Events"
        subtitle="Enter the world of events. Discover the latest events or start creating your own!"
      />
      <div className="grid grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, index) => (
          <EventCard
            key={index}
            title="Abstract Colors"
            author="By Esther Jackson"
            date="Current Date"
            imageUrl="/event-image-placeholder.png"
          />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
