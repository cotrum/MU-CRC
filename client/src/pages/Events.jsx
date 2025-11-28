import React from 'react';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import "../styles/global.css";

const Events = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffffff 0%, #ebf2f7 50%, #e9f2f7 100%)' }}>
      <Header />
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-glow"></div>
        <div className="hero-content">
          <h1 className="hero-title">Events Calendar</h1>
          <p className="hero-description">
            Stay updated with our upcoming cybersecurity events, workshops, and meetings. 
            All events are displayed in Eastern Time.
          </p>
        </div>
      </div>

      {/* Calendar Container */}
      <div className="section-box" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto 3rem auto',
        padding: '2rem',
        background: 'var(--white)',
        border: '2px solid #e5e7eb',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ 
            color: 'var(--cyber-blue)',
            marginBottom: '1rem'
          }}>
            Upcoming Events
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            View our schedule and never miss an important cybersecurity event
          </p>
        </div>

        {/* Outlook Calendar Iframe */}
        <div style={{
          border: '2px solid #e5e7eb',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }} 
        className="cyber-border"
        >
          <iframe
            src="https://outlook.office365.com/owa/calendar/911c64dd96e54c01aa6208421868645d@rpi.edu/051a8861feda43d0871df85155911a5015038586886625751096/calendar.html"
            style={{ 
              border: 0, 
              width: "100%", 
              height: "600px",
              display: 'block'
            }}
            frameBorder="0"
            title="Outlook Calendar"
            loading="lazy"
          />
        </div>

        {/* Additional Info Section */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'var(--gray-lighter)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ color: 'var(--cyber-blue)', marginBottom: '1rem' }}>Calendar Information</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            • All times are displayed in Eastern Time (ET)
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            • Click on events for detailed information
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            • Subscribe to the calendar to get automatic updates
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            • Questions? <a href="/contact" style={{ color: 'var(--cyber-accent)' }}>Contact us</a>
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Events;