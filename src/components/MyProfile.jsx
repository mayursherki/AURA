
import React, { useState } from "react";

function MyProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    goal: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Profile updated successfully!");
  };

  return (
    <div className="student-info-card">
      <h3 className="student-section-title">
        👤 My Profile
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            className="form-control"
            value={profile.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Wellness Goal</label>
          <select
            name="goal"
            className="form-select"
            value={profile.goal}
            onChange={handleChange}
            required
          >
            <option value="">Select your goal</option>
            <option value="Fitness">Fitness</option>
            <option value="Stress Relief">Stress Relief</option>
            <option value="Flexibility">Flexibility</option>
            <option value="Mental Wellness">Mental Wellness</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          Update Profile
        </button>

        {message && (
          <p className="text-success mt-3">{message}</p>
        )}
      </form>
    </div>
  );
}

export default MyProfile;
