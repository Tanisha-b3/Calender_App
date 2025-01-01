import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./cal.css";

const CalendarSection = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    date: "",
    title: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const addEvent = (e) => {
    e.preventDefault();
    if (newEvent.date && newEvent.title && newEvent.description) {
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setNewEvent({ date: "", title: "", description: "" });
      setError("");
      alert("Event added successfully!");
    } else {
      setError("Please fill in all fields!");
    }
  };

  const deleteEvent = (indexToDelete) => {
    const updatedEvents = events.filter((_, index) => index !== indexToDelete);
    setEvents(updatedEvents);
    alert("Event deleted successfully!");
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dayEvents = events.filter(
        (event) => new Date(event.date).toDateString() === date.toDateString()
      );
      return (
        <div>
          {dayEvents.map((event, index) => (
            <div key={index} className="event-marker" title={event.description}>
              {event.title}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const hasEvent = events.some(
        (event) => new Date(event.date).toDateString() === date.toDateString()
      );
      return hasEvent ? "highlight-event" : null;
    }
    return null;
  };

  return (
    <div className="calendar-section">
      <h4>Calendar View</h4>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={tileContent}
        tileClassName={tileClassName}
      />

      <div className="event-form">
        <h4>Add Event</h4>
        <form onSubmit={addEvent}>
          {error && <div className="error-message">{error}</div>}
          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Add Event</button>
        </form>
      </div>

      <div className="event-list">
        <h4>Event List</h4>
        {events.length === 0 ? (
          <p>No events added yet.</p>
        ) : (
          <ul>
            {events.map((event, index) => (
              <li key={index} className="event-item">
                <div>
                  <strong>{event.title}</strong> ({event.date})
                  <p>{event.description}</p>
                </div>
                <button
                  onClick={() => deleteEvent(index)}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CalendarSection;
