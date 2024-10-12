"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// CreateEvent component
const CreateEvent: React.FC = () => {
  const [eventData, setEventData] = useState({
    title: "",
    venue: "",
    host: "",
    startDate: "",
    startTime: "",
    endTime: "",
    image: null as File | null, // Update image type to File or null
    description: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Image preview state
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true); // Loading state to prevent flashing
  const router = useRouter();

  useEffect(() => {
    // Fetch user from local storage
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setIsAdmin(user.isAdmin);

      // If not an admin, redirect to dashboard
      if (!user.isAdmin) {
        router.push("/dashboard");
      } else {
        setLoading(false); // Stop loading once user is confirmed as admin
      }
    } else {
      // If no user is logged in, redirect to login page
      router.push("/login");
    }
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventData({ ...eventData, image: file });

      // Create a URL for the image preview
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("venue", eventData.venue);
    formData.append("host", eventData.host);
    formData.append("startDate", eventData.startDate);
    formData.append("startTime", eventData.startTime);
    formData.append("endTime", eventData.endTime);
    if (eventData.image) formData.append("image", eventData.image); // Image as file
    formData.append("description", eventData.description);

    try {
      // Send POST request to create the event
      const response = await axios.post(
        "http://localhost:5000/api/events/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Event created successfully!");
        router.push("/dashboard/events");
      }
    } catch (error) {
      console.error("Failed to create event", error);
      alert("There was an error creating the event.");
    }
  };

  // Don't show anything while loading
  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-gray-900 p-8 rounded-lg shadow-lg"
        encType="multipart/form-data"
      >
        <h1 className="text-4xl font-bold mb-8 text-white text-center">
          Create Event
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {/* Event Title */}
          <div className="col-span-2">
            <label className="block text-white mb-2">Event Title</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-black rounded-lg"
              required
            />
          </div>

          {/* Event Venue */}
          <div>
            <label className="block text-white mb-2">Venue</label>
            <input
              type="text"
              name="venue"
              value={eventData.venue}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-black rounded-lg"
              required
            />
          </div>

          {/* Host Name */}
          <div>
            <label className="block text-white mb-2">Host Name</label>
            <input
              type="text"
              name="host"
              value={eventData.host}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-black rounded-lg"
              required
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-white mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={eventData.startDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-black rounded-lg"
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-white mb-2">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={eventData.startTime}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-black rounded-lg"
              required
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-white mb-2">End Time</label>
            <input
              type="time"
              name="endTime"
              value={eventData.endTime}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-black rounded-lg"
              required
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="col-span-2 mb-4">
              <h3 className="text-white mb-2">Image Preview:</h3>
              <img
                src={imagePreview}
                alt="Event Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Event Image Upload */}
          <div className="col-span-2">
            <label className="block text-white mb-2">Event Image</label>
            <input
              type="file"
              id="image" // Set id for the input
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden" // Hide the default input
            />
            <label
              htmlFor="image"
              className="w-full text-center py-3 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
            >
              Upload Image
            </label>
            {imagePreview && (
              <div className="flex justify-between items-center mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setEventData({ ...eventData, image: null });
                  }}
                  className="text-red-500 hover:underline"
                >
                  Change Image
                </button>
              </div>
            )}
          </div>

          {/* Event Description */}
          <div className="col-span-2">
            <label className="block text-white mb-2">Event Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-black rounded-lg"
              rows={5}
              required
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
