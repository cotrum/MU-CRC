import React from 'react';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import "../styles/global.css";
import "../styles/layout.css";
import "../styles/Events.css";

const Events = () => {
  return (
    <>
      <Header />
      
      <div className="page-container">
        <h1 className="page-title">Events Calendar</h1>

        <section className="about-intro">
          <p className="lead-text">
            Stay updated with our upcoming cybersecurity events, workshops, and meetings. 
            All events are displayed in Eastern Time.
          </p>
        </section>

        <section className="about-section">
          <h2>Upcoming Events</h2>
          <div className="section-box">
            {/* Calendar Iframe */}
            <div className="calendar-wrapper cyber-border">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=fc836d8edc06a2f0844f9779432ea1bcb723cbe8fec4232a740f1a15854c7290%40group.calendar.google.com&ctz=America%2FNew_York"
                className="calendar-iframe"
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="no"
                title="RPI Cybersecurity Club Calendar"
              ></iframe>
            </div>

            {/* Additional Info Section */}
            <div className="info-box">
              <h3>Calendar Information</h3>
              <p className="info-item">All times are displayed in Eastern Time (ET)</p>
              <p className="info-item">Click on events for detailed information</p>
              <p className="info-item">Subscribe to the calendar to get automatic updates</p>
              <p className="info-note">
                Questions? <a href="/contact" className="info-link">Contact us</a>
              </p>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default Events;