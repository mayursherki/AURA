import SubscriptionPlans from "./SubscriptionPlans";
import BookSession from "./BookSession";
import MySessions from "./MySessions";
import MyProfile from "./MyProfile";
import React, { useState } from "react";
import "./StudentDashboard.css";

function StudentDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
const [selectedSession, setSelectedSession] = useState(null);
const [bookings, setBookings] = useState([]);
const [selectedPlan, setSelectedPlan] = useState("");
  const menuItems = [
    "Dashboard",
    "My Sessions",
    "Book Session",
    "Subscription Plans",
    "My Bookings",
    "My Profile"
  ];

  return (
    <div className="student-dashboard d-flex">

      {/* Sidebar */}
      <aside className="student-sidebar">
        <h2 className="student-logo">🌸 AURA</h2>
        <p className="student-logo-subtitle">Yoga & Wellness</p>

        <hr />

        <nav className="student-menu">
          {menuItems.map((item) => (
            <button
              key={item}
              className={
                activeMenu === item
                  ? "student-menu-item active"
                  : "student-menu-item"
              }
              onClick={() => setActiveMenu(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className="student-main flex-grow-1">

        <div className="student-topbar">
          <h4>Student Dashboard</h4>
          <span>👤 My Account</span>
        </div>

        <div className="student-welcome">
          <h2>Welcome to AURA Yoga! 🌿</h2>
          <p>
            Your personal space for yoga, meditation
            and wellness.
          </p>
        </div>

        {activeMenu === "Dashboard" ? (
          <>
            <h4 className="student-section-title">
              My Yoga Overview
            </h4>

            <div className="row g-4">

              <div className="col-md-4">
                <div className="student-stat-card">
                  <div className="student-card-icon">🧘</div>
                  <h5>My Sessions</h5>
                  <h2>{bookings.length}</h2>
                  <p>Upcoming sessions</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="student-stat-card">
                  <div className="student-card-icon">📅</div>
                  <h5>My Bookings</h5>
                  <h2>{bookings.length}</h2>
                  <p>Confirmed bookings</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="student-stat-card">
                  <div className="student-card-icon">🌸</div>
                  <h5>Subscription</h5>
                  <h2>{selectedPlan || "None"}</h2>
                  <p>No active subscription</p>
                </div>
              </div>

            </div>

            <div className="student-info-card mt-4">
              <h4>🌿 Begin Your Wellness Journey</h4>
              <p>
                Explore yoga sessions, book your classes,
                and choose a subscription plan that
                matches your wellness goals.
              </p>
              <button
                className="btn btn-success"
                onClick={() => setActiveMenu("Book Session")}
              >
                Explore Sessions
              </button>
            </div>
          </>
       
        ) : activeMenu === "My Sessions" ? (
          <MySessions
            onBookSession={(session) => {
              setSelectedSession(session);
              setActiveMenu("Book Session");
            }}
          />
        ) : activeMenu === "Book Session" ? (
          <BookSession
            selectedSession={selectedSession}
            onBookingConfirm={(booking) => {
              setBookings((previous) => [...previous, booking]);
              setActiveMenu("My Bookings");
            }}
          />
) : activeMenu === "Subscription Plans" ? (
 <SubscriptionPlans
  selectedPlan={selectedPlan}
  onSelectPlan={setSelectedPlan}
/>
  ) : activeMenu === "My Profile" ? (
  <MyProfile />     
) : activeMenu === "My Bookings" ? (
  <div className="student-info-card">
    <h3>📋 My Bookings</h3>

    {bookings.length === 0 ? (
      <p>No sessions booked yet.</p>
    ) : (
      <div className="table-responsive">
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Session</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Meeting</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.session}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.status}</td>
                <td>
  <button
    className="btn btn-secondary btn-sm"
    disabled
  >
    Join Meeting
  </button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
        ) : (
          <div className="student-info-card">
            <h3>{activeMenu}</h3>
            <p>
              This section will be developed in the
              next steps.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}

export default StudentDashboard;
