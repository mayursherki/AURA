import React, { useState } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
   const [showBookingForm, setShowBookingForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    yoga: "",
    location: "",
  });

  const [locationMessage, setLocationMessage] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [booking, setBooking] = useState(null);

  const services = [
    {
      id: 1,
      name: "Hatha Yoga",
      description: "Improve flexibility, balance and body strength.",
      price: 499,
      icon: "🪷",
    },
    {
      id: 2,
      name: "Meditation & Mindfulness",
      description: "Relax your mind and reduce everyday stress.",
      price: 399,
      icon: "🌸",
    },
    {
      id: 3,
      name: "Power Yoga",
      description: "Build stamina, strength and improve fitness.",
      price: 599,
      icon: "🪷",
    },
    {
      id: 4,
      name: "Yoga for Better Sleep",
      description: "Relax your body and prepare for better sleep.",
      price: 349,
      icon: "🌿",
    },
    {
      id: 5,
      name: "Beginner Yoga",
      description: "Start your yoga journey with simple exercises.",
      price: 299,
      icon: "🪷",
    },
  ];

  const addToCart = (service) => {
    setCart((previousCart) => {
      const exists = previousCart.some(
        (item) => item.id === service.id
      );

      if (exists) {
        return previousCart.filter(
          (item) => item.id !== service.id
        );
      }

      return [...previousCart, service];
    });
  };
   const handleInputChange = (event) => {
  const { name, value } = event.target;

  setFormData((previous) => ({
    ...previous,
    [name]: value,
  }));
};

const fetchCurrentLocation = () => {
  setLocationMessage("");

  if (!navigator.geolocation) {
    setLocationMessage("Your browser does not support location.");
    return;
  }

  setLocationMessage("Fetching location...");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const location =
        `${position.coords.latitude}, ${position.coords.longitude}`;

      setFormData((previous) => ({
        ...previous,
        location,
      }));

      setLocationMessage("Location fetched successfully!");
    },
    () => {
      setLocationMessage(
        "Location permission denied. You can enter your location manually."
      );
    }
  );
};

const handleBookingSubmit = (event) => {
  event.preventDefault();
  setFormMessage("");

  if (!formData.location.trim()) {
    setFormMessage("Please enter or fetch your location.");
    return;
  }

  setBooking({ ...formData });
  setShowBookingForm(false);
};
  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="website">

      {/* Navigation */}
      <nav className="navbar">
        <a href="#home" className="logo">
          <span className="logo-icon">♧</span>
          Yoga Aura
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">

        <div className="hero-content">
          <p className="subtitle">WELCOME TO YOGA AURA</p>

          <h1>
            Find Your Balance,
            <br />
            Discover Inner Peace
          </h1>

          <p className="description">
            Welcome to Yoga Aura, your personal space for yoga,
            meditation and mindfulness. Discover a healthier
            lifestyle with guided yoga sessions designed for
            beginners and experienced practitioners.
          </p>

          <a href="#services" className="explore-button">
            Explore Our Services →
          </a>

          {/* Pre-Demo Card */}
          <div className="predemo">
            <div className="predemo-icon">🪷</div>

            <div className="predemo-text">
              <h3>Book Your Pre-Demo</h3>
              <p>
                Experience our yoga session before joining a class.
              </p>
            </div>

            <button
             type="button"
  className="book-button"
  onClick={() => setShowBookingForm(true)}
>
  Book Now - ₹99
            </button>
          </div>
        </div>

        {/* Video Section */}
        <div className="hero-video">
          <video controls poster="/yoga-poster.jpg">
            <source src="/yoga-video.mp4" type="video/mp4" />
            Your browser does not support video playback.
          </video>

          <p>Relax your mind. Strengthen your body.</p>
        </div>

      </section>

      {/* Services Section */}
      <section className="services" id="services">

        <div className="section-heading">
          <p className="subtitle">FIND YOUR PRACTICE</p>
          <h2>Our Yoga Services</h2>
          <p>
            Choose a class that matches your goals and lifestyle.
          </p>
        </div>

        <div className="service-layout">

          <div className="service-container">
            {services.map((service) => {
              const added = cart.some(
                (item) => item.id === service.id
              );

              return (
                <div className="service-card" key={service.id}>
                  <div className="service-icon">
                    {service.icon}
                  </div>

                  <h3>{service.name}</h3>

                  <p>{service.description}</p>

                  <h4>₹{service.price}</h4>

                  <button
                    className={
                      added ? "added-button" : "add-button"
                    }
                    onClick={() => addToCart(service)}
                  >
                    {added ? "✓ Added" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Selected Classes */}
          <aside className="cart-summary">
            <h3>🛒 Selected Classes</h3>

            {cart.length === 0 ? (
              <p className="empty-cart">
                No classes selected yet.
              </p>
            ) : (
              <>
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <span>{item.name}</span>
                    <span>₹{item.price}</span>

                    <button
                      aria-label={`Remove ${item.name}`}
                      onClick={() => addToCart(item)}
                    >
                      ×
                    </button>
                  </div>
                ))}

                <div className="cart-total">
                  <strong>Total:</strong>
                  <strong>₹{total.toLocaleString("en-IN")}</strong>
                </div>
              </>
            )}
          </aside>

        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="about-image">
          <img
            src="/yoga-about.jpg"
            alt="Yoga and meditation space"
          />
        </div>

        <div className="about-content">
          <p className="subtitle">ABOUT AURA</p>

          <h2>Your Journey to a Better You</h2>

          <p>
            Yoga Aura brings yoga, meditation and mindfulness
            together to support your wellness journey. Our classes
            help you focus on flexibility, strength, relaxation
            and healthy daily habits.
          </p>
        </div>

        <div className="about-decoration">❀</div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h2>Yoga Aura</h2>
        <p>Find your balance. Live mindfully.</p>
        <p>© 2026 Aura. All rights reserved.</p>
      </footer>
      {/* Booking Form */}
      {showBookingForm && (
        <div className="booking-overlay">
          <div className="booking-modal">
            <button
              type="button"
              className="close-booking"
              onClick={() => setShowBookingForm(false)}
            >
              ×
            </button>

            <p className="subtitle">YOGA AURA</p>
            <h2>Book Your Pre-Demo</h2>
            <p className="booking-price">Pre-Demo Price: ₹99</p>

            <form onSubmit={handleBookingSubmit}>
              <label htmlFor="booking-name">Full Name</label>
              <input
                id="booking-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />

              <label htmlFor="booking-email">Email Address</label>
              <input
                id="booking-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />

              <label htmlFor="booking-mobile">Mobile Number</label>
              <input
                id="booking-mobile"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                maxLength={10}
                required
              />

              <label htmlFor="booking-yoga">Select Yoga Class</label>
              <select
                id="booking-yoga"
                name="yoga"
                value={formData.yoga}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose a class</option>
                <option value="Hatha Yoga">Hatha Yoga</option>
                <option value="Power Yoga">Power Yoga</option>
                <option value="Yoga for Better Sleep">
                  Yoga for Better Sleep
                </option>
                <option value="Beginner Yoga">Beginner Yoga</option>
              </select>

              <label htmlFor="booking-location">Current Location</label>

              <button
                type="button"
                className="location-button"
                onClick={fetchCurrentLocation}
              >
                Fetch Current Location
              </button>

              <input
                id="booking-location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Location or coordinates"
                required
              />

              {locationMessage && (
                <p className="location-message">
                  {locationMessage}
                </p>
              )}

              {formMessage && (
                <p className="form-error">{formMessage}</p>
              )}

              <button type="submit" className="submit-booking">
                Submit Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Booking Confirmation */}
      {booking && (
        <div className="booking-overlay">
          <div className="booking-modal">
            <button
              type="button"
              className="close-booking"
              onClick={() => setBooking(null)}
            >
              ×
            </button>

            <h2>Booking Details Saved!</h2>

            <p><strong>Name:</strong> {booking.name}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Mobile:</strong> {booking.mobile}</p>
            <p><strong>Yoga Class:</strong> {booking.yoga}</p>
            <p><strong>Location:</strong> {booking.location}</p>
            <h3>Pre-Demo Amount: ₹99</h3>

            <p className="booking-note">
              This is a demo confirmation. Payment has not been collected.
            </p>

            <button
              type="button"
              className="submit-booking"
              onClick={() => {
                setBooking(null);
                setFormData({
                  name: "",
                  email: "",
                  mobile: "",
                  yoga: "",
                  location: "",
                });
              }}
            >
              Pay & Continue
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;