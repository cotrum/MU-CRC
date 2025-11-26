import React from 'react';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import "../styles/global.css";
import "../styles/layout.css";
import "../styles/About.css";

const About = () => {
  return (
    <>
      <Header />
      
      <div className="page-container">
        <h1 className="page-title">About Our Center</h1>

        <section className="about-intro">
          <p className="lead-text">
            The Monmouth University Cybersecurity Research Center is dedicated to advancing the field of cybersecurity through cutting-edge research, hands-on education, and meaningful industry partnerships.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <div className="section-box">
            <p>
              Our mission is to prepare the next generation of cybersecurity professionals while conducting innovative research that addresses real-world security challenges. We strive to create a collaborative environment where students, faculty, and industry partners work together to protect digital infrastructure and advance cybersecurity knowledge.
            </p>
          </div>
        </section>

        <section className="about-section">
          <h2>What We Do</h2>
          <div className="grid grid-2">
            <div className="card cyber-border">
              <h3>Research Excellence</h3>
              <p>
                We conduct cutting-edge research in areas including network security, cryptography, threat intelligence, malware analysis, and secure systems design. Our faculty and students publish in top-tier conferences and journals.
              </p>
            </div>

            <div className="card cyber-border">
              <h3>Education & Training</h3>
              <p>
                We offer comprehensive cybersecurity education through degree programs, certificates, workshops, and Capture The Flag (CTF) competitions. Students gain practical experience with industry-standard tools and techniques.
              </p>
            </div>

            <div className="card cyber-border">
              <h3>Industry Collaboration</h3>
              <p>
                We partner with leading companies and government agencies to address pressing security challenges. These partnerships provide students with internship opportunities and real-world project experience.
              </p>
            </div>

            <div className="card cyber-border">
              <h3>Competitive Teams</h3>
              <p>
                Our CTF teams compete in national and international cybersecurity competitions, consistently ranking among top performers. These competitions sharpen skills and build camaraderie.
              </p>
            </div>
          </div>
        </section>


        <section className="about-section">
          <h2>Get Involved</h2>
          <div className="section-box cta-box">
            <p>
              Whether you're a student interested in cybersecurity, a company seeking research partnerships, or a professional looking to contribute, we welcome your involvement.
            </p>
            <div className="cta-buttons">
              <button onClick={() => window.location.href = '/contact'} className="btn">
                Contact Us
              </button>
              <button onClick={() => window.location.href = '/events'} className="btn btn-secondary">
                View Events
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default About;