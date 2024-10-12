"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AdminDashboard: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch events, users, and bookings count concurrently
        const [eventsResponse, usersResponse, bookingsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/events"),
          axios.get("http://localhost:5000/api/admin/users"),
          axios.get("http://localhost:5000/api/admin/bookings/count"),
        ]);

        setEvents(eventsResponse.data.events); // Set events data
        setUsers(usersResponse.data.users); // Set users data
        setTotalUsers(usersResponse.data.totalUsers); // Set total users
        setTotalBookings(bookingsResponse.data.totalBookings); // Set total bookings
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Delete an event
  const handleDeleteEvent = async (id: string) => {
    try {
      await axios.delete(`/api/admin/events/${id}`);
      setEvents(events.filter(event => event._id !== id)); // Update events state
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Delete a user
  const handleDeleteUser = async (id: string) => {
    try {
      await axios.delete(`/api/admin/users/${id}`);
      setUsers(users.filter(user => user._id !== id)); // Update users state
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <h2 className="text-lg">Total Users: {totalUsers}</h2>
      <h2 className="text-lg">Total Bookings: {totalBookings}</h2>
      <h2 className="text-lg">Total Upcoming Events: {events.filter(event => new Date(event.startDate) >= new Date()).length}</h2>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Events</h2>
        <table className="min-w-full mt-4 bg-white">
          <thead>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Venue</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">Bookings</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td className="border px-4 py-2">{event.title}</td>
                <td className="border px-4 py-2">{event.venue}</td>
                <td className="border px-4 py-2">{new Date(event.startDate).toLocaleString()}</td>
                <td className="border px-4 py-2">{event.bookings}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteEvent(event._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => router.push(`/admin/events/edit/${event._id}`)}
                    className="bg-blue-600 text-white px-2 py-1 rounded ml-2"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Users</h2>
        <table className="min-w-full mt-4 bg-white">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
