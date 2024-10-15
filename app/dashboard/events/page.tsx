"use client";
import React, { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";
import { useRouter } from "next/navigation";

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
  const [showAll, setShowAll] = useState(false); // Controls the display of all events
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term for filtering events
  const router = useRouter();

  // Fetch events from the API
  const fetchEvents = async () => {
    try {
      const response = await fetch("https://eventhive-unyb.onrender.com/api/events"); // Make sure this matches your backend route
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data); // Assuming the data is an array of events
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = () => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      router.push("/login");
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, [router]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchEvents();
    }
  }, [isLoggedIn]);

  // Handle Search Filtering
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle View More / View Less
  const displayedEvents = showAll ? filteredEvents : filteredEvents.slice(0, 3); // Limit to 3 events unless 'showAll' is true

  if (isLoggedIn === null) return null; // Prevent rendering until user check is done

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="flex justify-end mb-6 mr-7">
        <input
          type="text"
          placeholder="Search for events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedEvents.length > 0 ? (
          displayedEvents.map((event) => (
            <EventCard
              eventId={event._id}
              description={event.description}
              key={event._id}
              title={event.title}
              venue={event.venue}
              author={event.host} // Assuming 'host' is passed as author
              date={`${new Date(event.startDate).toLocaleDateString()} ${
                event.startTime
              } - ${event.endTime}`} // Format the date and time
              imageUrl={event.image || "/uploads/event-image-placeholder.png"} // Fallback image if none provided
            />
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>

      {/* Show More/Less Button */}
      {filteredEvents.length > 3 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 right-5 absolute "
          >
            {showAll ? "View Less" : "View More .."}
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
