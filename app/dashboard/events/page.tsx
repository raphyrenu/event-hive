"use client";
import React, { useEffect, useState } from 'react';
import image from '../../assets/images/discover.png';
import EventCard from '../../components/EventCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Event {
  _id: string;
  title: string;
  venue: string;
  host: string;
  startDate: string; // Keep as string to match API response
  startTime: string;
  endTime: string;
  description: string;
  image?: string; // Optional since it might not be provided
}

// EventsPage component
const EventsPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setIsLoggedIn(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    // Fetch events from the API
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events'); // Make sure this matches your backend route
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data); // Assuming the data is an array of events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (isLoggedIn) {
      fetchEvents();
    }
  }, [isLoggedIn]);

  if (isLoggedIn === null) return null; // Prevent rendering until user check is done

  return (
    <div>
      {/* Header Image */}
      <Image src={image} alt="Discover image" className="rounded-xl w-full h-80 mb-14" />

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
          key={event._id}
          title={event.title}
          venue={event.venue}
          author={event.host} // Assuming 'host' is passed as author
          date={`${new Date(event.startDate).toLocaleDateString()} ${event.startTime} - ${event.endTime}`} // Format the date and time
          imageUrl={event.image || "/event-image-placeholder.png"} // Fallback image if none provided
        />

        ))}
      </div>
    </div>
  );
};

export default EventsPage;
