import React from 'react';
import Footer from "../components/Footer.jsx";
import "../styles/global.css";
import "../styles/layout.css";
import "../styles/Sponsorship.css";

const Sponsorship = () => {
  // Edit this array to update sponsors shown on the page
  const sponsors = [
    {
      name: 'Monmouth University',
      level: 'Founding Sponsor',
      logo: '/logos/295/horizontal/MU-Primary Logo-PMS 295_cybersecurity.png',
      website: 'https://www.monmouth.edu'
    },
    {
      name: 'SecureTech (Placeholder)',
      level: 'Gold Sponsor',
      website: 'https://example.com'
    },
    {
      name: 'Acme Security (Placeholder)',
      level: 'Silver Sponsor',
      website: 'https://example.com'
    }
  ];

  const contactEmail = 'cybersecurity@monmouth.edu';
  const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent('Sponsorship Inquiry')}`;

  return (
    <>

      <div className="page-container">
        <h1 className="page-title">Our Sponsors</h1>

        <section className="section-box content-narrow">
          <p className="lead-text">
            We gratefully acknowledge the organizations that support the Monmouth University Cybersecurity Research Center. Their contributions help fund student research, events, and hands-on learning opportunities.
          </p>
        </section>

        <section className="sponsors-section">

          <div className="sponsorship-cta-top">
            <p>
              Interested in sponsoring our work? We'd love to talk. Email us at{' '}
              <a href={mailto}>{contactEmail}</a> to learn about sponsorship levels and benefits.
            </p>

            <a className="btn contact-btn" href={mailto}>Contact Us About Sponsorship</a>
          </div>

          <h2 className="section-title section-title--center">Current Sponsors</h2>

          <div className="sponsors-grid">
            {sponsors.map((s, idx) => (
              <div key={idx} className="sponsor-card cyber-border">
                {s.logo ? (
                  <a href={s.website || '#'} target="_blank" rel="noopener noreferrer">
                    <img src={s.logo} alt={`${s.name} logo`} className="sponsor-logo" />
                  </a>
                ) : (
                  <div className="sponsor-placeholder">
                    <div className="sponsor-initials">{s.name.split(' ').slice(0,2).map(n=>n[0]).join('')}</div>
                  </div>
                )}

                <div className="sponsor-info">
                  <h3 className="sponsor-name">{s.name}</h3>
                  <p className="sponsor-level">{s.level}</p>
                  {s.website && (
                    <a className="sponsor-link" href={s.website} target="_blank" rel="noopener noreferrer">Visit website</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Sponsorship;