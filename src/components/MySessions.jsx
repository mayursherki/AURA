
import React from "react";

function MySessions({ onBookSession }) {
  const sessions = [
    {
      id: 1,
      name: "Basic Yoga",
      description: "Learn basic yoga poses, flexibility and breathing.",
      icon: "🧘",
      duration: "45 Minutes",
    },
    {
      id: 2,
      name: "Meditation",
      description: "Improve concentration and relax your mind.",
      icon: "🪷",
      duration: "30 Minutes",
    },
    {
      id: 3,
      name: "NLP",
      description: "Explore mindset, communication and personal growth.",
      icon: "🌿",
      duration: "60 Minutes",
    },
  ];

  return (
    <div>
      <h3 className="student-section-title">My Sessions</h3>
      <p>Explore our available wellness sessions.</p>

      <div className="row g-4">
        {sessions.map((session) => (
          <div className="col-md-6 col-lg-4" key={session.id}>
            <div className="student-stat-card">
              <div className="student-card-icon">
                {session.icon}
              </div>

              <h4>{session.name}</h4>
              <p>{session.description}</p>
              <p>
                <strong>Duration:</strong> {session.duration}
              </p>

              <button
                className="btn btn-success"
                onClick={() => onBookSession(session)}
              >
                Book Session
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MySessions;
