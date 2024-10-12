// app/events/edit/[id].tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EditEventPage: React.FC = () => {
  const [eventData, setEventData] = useState<any>({
    title: '',
    venue: '',
    host: '',
    startDate: '',
    startTime: '',
    endTime: '',
    description: '',
    image: null,
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`/api/events/${id}`);
      const data = await response.json();
      setEventData(data);
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEventData({
        ...eventData,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(eventData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      const response = await fetch(`/api/events/update/${id}`, {
        method: 'PUT',
        body: form,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // JWT token
        },
      });

      if (response.ok) {
        alert('Event updated successfully');
        router.push('/events');
      } else {
        alert('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl mb-4">Edit Event</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" value={eventData.title} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="venue">Venue:</label>
          <input type="text" name="venue" value={eventData.venue} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="host">Host:</label>
          <input type="text" name="host" value={eventData.host} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" name="startDate" value={eventData.startDate} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input type="time" name="startTime" value={eventData.startTime} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="endTime">End Time:</label>
          <input type="time" name="endTime" value={eventData.endTime} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea name="description" value={eventData.description} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" name="image" onChange={handleFileChange} />
        </div>
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default EditEventPage;
