import React, { useState, useEffect } from 'react';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import "../styles/global.css";
import "../styles/layout.css";
import "../styles/Home.css";

// Import the logo (adjust path/filename as needed)
import MUCRClogo from "../../public/logos/295 + Gray/MU-Vertical Logo-PMS295-gray_Cybersecurity-research.png";  // or .svg

const Home = () => {
  // Add your team images here
  const leftImages = [
    "/images/mucrcimage.jpg",
    "/images/teamPic.jpg"
  ];
  
  const rightImages = [
    "/images/cyber-hawks.jpg",
    "/images/mucrcimage.jpg"
  ];

  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  // Auto-advance carousels
  useEffect(() => {
    const leftInterval = setInterval(() => {
      setLeftIndex((prev) => (prev + 1) % leftImages.length);
    }, 5000); // Change every 5 seconds

    const rightInterval = setInterval(() => {
      setRightIndex((prev) => (prev + 1) % rightImages.length);
    }, 5500); // Slightly different timing

    return () => {
      clearInterval(leftInterval);
      clearInterval(rightInterval);
    };
  }, [leftImages.length, rightImages.length]);

  const nextLeft = () => {
    setLeftIndex((prev) => (prev + 1) % leftImages.length);
  };

  const prevLeft = () => {
    setLeftIndex((prev) => (prev - 1 + leftImages.length) % leftImages.length);
  };

  const nextRight = () => {
    setRightIndex((prev) => (prev + 1) % rightImages.length);
  };

  const prevRight = () => {
    setRightIndex((prev) => (prev - 1 + rightImages.length) % rightImages.length);
  };

  return (
    <>
      
      
      {/* Hero section is NOT inside page-container to allow full width */}
      <section className="hero-section">
        <div className="hero-glow" />

        <div className="hero-content">
          {/* Background carousel layout */}
          <div className="hero-carousel-layout">
            {/* Left Arrow (outside left carousel) */}
            <button className="carousel-arrow-outside left" onClick={prevLeft}>
              ‹
            </button>

            {/* Left Carousel */}
            <div className="carousel-section left-section">
              {leftImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Team photo ${index + 1}`}
                  className={`carousel-bg-image ${index === leftIndex ? 'active' : ''}`}
                />
              ))}
            </div>

            {/* Center - Logo */}
            <div className="logo-section">
              <img 
                src={MUCRClogo} 
                alt="Monmouth University Cybersecurity Research Center" 
                className="hero-logo"
              />
            </div>

            {/* Right Carousel */}
            <div className="carousel-section right-section">
              {rightImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Team photo ${index + 4}`}
                  className={`carousel-bg-image ${index === rightIndex ? 'active' : ''}`}
                />
              ))}
            </div>

            {/* Right Arrow (outside right carousel) */}
            <button className="carousel-arrow-outside right" onClick={nextRight}>
              ›
            </button>
          </div>
        </div>
      </section>

      {/* Rest of content inside page-container */}
      <div className="page-container">
        <section className="features-section">
          <h2 className="section-title">Our Mission</h2>
          <div className="grid grid-3">
            <div className="card cyber-border">
              <h3 className="feature-card-title">RESEARCH</h3>
              <p className="feature-card-description">
                Cutting-edge cybersecurity research advancing the field of digital defense.
              </p>
            </div>
            
            <div className="card cyber-border">
              <h3 className="feature-card-title">EDUCATION</h3>
              <p className="feature-card-description">
                Training the next generation of cybersecurity professionals.
              </p>
            </div>
            
            <div className="card cyber-border">
              <h3 className="feature-card-title">COLLABORATION</h3>
              <p className="feature-card-description">
                Partnering with industry leaders to solve real-world challenges.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="grid grid-4">
            <div className="stat-card">
              <div className="stat-number">#2</div>
              <div className="stat-label">of 500+ universities (Fall 2025 NCL Power Rankings)</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">30+</div>
              <div className="stat-label">Students involved in cybersecurity research</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1st</div>
              <div className="stat-label">Year of excellence!</div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Join Us?</h2>
            <p className="cta-description">
              Whether you're a student, researcher, or industry partner, we'd love to connect.
            </p>
            <div className="cta-buttons">
              <button 
                onClick={() => window.location.href = '/contact'}
                className="cta-button primary"
              >
                Get in Touch
              </button>
              <button 
                onClick={() => window.location.href = '/about'}
                className="cta-button secondary"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Home;