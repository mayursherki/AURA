
import React, { useState } from "react";

function BookSession({ selectedSession, onBookingConfirm }) {
  const [sessionName, setSessionName] = useState(
    selectedSession?.name || ""
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const sessions = ["Basic Yoga", "Meditation", "NLP"];

  const timeSlots = [
    "06:00 AM - 07:00 AM",
    "08:00 AM - 09:00 AM",
    "05:00 PM - 06:00 PM",
    "07:00 PM - 08:00 PM",
  ];

  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!sessionName || !date || !time) {
      setMessage("Please fill all fields.");
      return;
    }

    if (date < localToday) {
      setMessage("Please select today or a future date.");
      return;
    }

    const booking = {
      id: Date.now(),
      session: sessionName,
      date: date,
      time: time,
      status: "Demo Booking",
    };

    onBookingConfirm(booking);
    setMessage("Session booking added successfully!");
    setDate("");
    setTime("");
  };

  return (
    <div className="student-info-card">
      <h3 className="student-section-title">
        📅 Book Your Yoga Session
      </h3>

      <p>Select your preferred session, date and time.</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Session</label>
          <select
            className="form-select"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            required
          >
            <option value="">Choose a session</option>
            {sessions.map((session) => (
              <option key={session} value={session}>
                {session}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Select Date</label>
          <input
            type="date"
            className="form-control"
            min={localToday}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select Time Slot</label>
          <select
            className="form-select"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="">Choose a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          Confirm Booking
        </button>

        {message && (
          <p className="mt-3 text-success">{message}</p>
        )}
      </form>
    </div>
  );
}

export default BookSession;
