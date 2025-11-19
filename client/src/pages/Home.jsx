import React from 'react';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import "../styles/global.css";
import "../styles/layout.css";
import "../styles/Home.css";

// Import the logo (adjust path/filename as needed)
import MUCRClogo from "../../public/logos/295 + Gray/MU-Vertical Logo-PMS295-gray_Cybersecurity-research.png";  // or .svg

const Home = () => {
  return (
    <>
      <Header />
      
      <div className="page-container">
        <section className="hero-section">
          <div className="hero-glow" />

          <div className="hero-content">
            {/* Logo replaces the long h1 text */}
            <div className="hero-logo-wrapper">
              <img 
                src={MUCRClogo} 
                alt="Monmouth University Cybersecurity Research Center" 
                className="hero-logo"
              />
            </div>
            
            

            {/* <p className="hero-description">
              Join us in advancing cybersecurity education, innovation, and collaboration.
            </p>
            
            <button 
              onClick={() => window.location.href = '/about'}
              className="hero-button pulse-glow"
            >
              Learn More
            </button> */}
          </div>
        </section>

        <section className="features-section">
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
      </div>

      <Footer />
    </>
  );
};

export default Home;