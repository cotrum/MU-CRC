import React from 'react';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import "../styles/global.css";
import "../styles/layout.css";
import "../styles/About.css";

const About = () => {
  return (
    <>
      
      <div className="page-container">
        <h1 className="page-title">About The MU CRC</h1>

        <section className="about-intro">
          <p className="lead-text">
            The Monmouth University Cybersecurity Research Center is dedicated to advancing the field of cybersecurity through cutting-edge research, hands-on education, and meaningful industry partnerships.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Do</h2>
          <div className="grid grid-2">
            <div className="card cyber-border">
              <h3>Research Excellence</h3>
              <p>
                We conduct cutting-edge research in areas including network security, cryptography, threat intelligence, malware analysis, and secure systems design.
              </p>
            </div>

            <div className="card cyber-border">
              <h3>Education & Training</h3>
              <p>
                We offer comprehensive cybersecurity education through degree programs, certificates, workshops, and Capture The Flag (CTF) competitions.
              </p>
            </div>

            <div className="card cyber-border">
              <h3>Industry Collaboration</h3>
              <p>
                We partner with leading companies and government agencies to address pressing security challenges.
              </p>
            </div>

            <div className="card cyber-border">
              <h3>Competitive Teams</h3>
              <p>
                Our CTF teams compete in national and international cybersecurity competitions, consistently ranking among top performers.
              </p>
            </div>
          </div>
        </section>


        <section className="about-section">
          <h2>Founder, Dr. Brian Callahan </h2>
          <div className="section-box founder-box">
            <div className="founder-flex">
            <div className="founder-image">
              <img 
                src="/images/brian-headshot.png" 
                alt="Dr. Brian Callahan" 
                className="founder-photo"
              />
            </div>

              <div className="founder-text">
                <p className="founder-title">Founder & Director</p>

                <p>
                  Brian Callahan, Ph.D., ISSMP, CISSP, CISM is a Specialist Professor in the Department of Computer Science and Software Engineering at Monmouth University and founder of the Research Center. His research spans cybersecurity and its intersections with emerging technologies such as quantum computing and generative AI, as well as the ways people learn and share knowledge through digital platforms. He is also an OpenBSD developer dedicated to secure, portable, and ethical software. Dr. Callahan holds an extensive portfolio of cybersecurity and IT certifications and previously served as Senior Lecturer, Graduate Program Director, and Director of the Cybersecurity Collaboratory at Rensselaer Polytechnic Institute. At RPI, he earned the 2024 Board of Trustees Outstanding Teacher Award and coached the National Cyber League CTF team to a #1 national ranking.

                </p>
                <p>
                  If you are a Monmouth student and passionate in cybersecurity, consider joining one of Dr. Callahan's research groups or reaching out to learn more about opportunities at the CRC!
                </p>
              </div>
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
