import React, { useState } from 'react';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import "../styles/global.css";
import "../styles/layout.css";
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    alert('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      
      <div className="page-container">
        <h1 className="page-title">Get In Touch</h1>

        <section className="contact-intro">
          <p className="lead-text">
            Have questions about our research, programs, or partnerships? We'd love to hear from you.
          </p>
        </section>

        <div className="contact-grid">
          {/* Contact Form */}
          <section className="contact-form-section">
            <h2>Send Us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </section>

          {/* Contact Info */}
          <aside className="contact-info-section">
            <h2>Contact Information</h2>
            <div className="info-card">
              <div className="info-item">
                <div>
                  <h4>Location</h4>
                  <p>Thompson Hall, Monmouth University<br />400 Cedar Avenue<br />West Long Branch, NJ 07764</p>
                </div>
              </div>

              <div className="info-item">
                <div>
                  <h4>Email</h4>
                  <p>
                    <a href="mailto:cybersecurity@monmouth.edu">cybersecurity@monmouth.edu</a><br></br>
                    <a href="mailto:briancallahan@monmouth.edu">briancallahan@monmouth.edu (Dr. Brian Callahan)</a>
                  </p>
                </div>
              </div>


              <div className="info-item">
                <div>
                  <h4>Office Hours</h4>
                  <p>Monday - Friday<br />9:00 AM - 5:00 PM EST</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <span>GitHub</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </aside>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default Contact;