import React from 'react';
import Footer from "../components/Footer.jsx"
import Header from "../components/Header.jsx"

const Home = () => {
  return (
    <div>
      <Header />

      <section style={{ 
        textAlign: 'center', 
        padding: '6rem 2rem', 
        background: 'linear-gradient(135deg, #e0f0ff, #f9fbff)' 
      }}>
        <h1 style={{ color: '#002b5c', fontSize: '2.5rem', marginBottom: '1rem' }}>
          Monmouth University Cybersecurity Research Center
        </h1>
        <p style={{ color: '#444', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Join us in advancing cybersecurity education, innovation, and collaboration.
        </p>
        <button 
          onClick={() => window.location.href = '/about'}
          style={{
            background: '#004080',
            color: '#fff',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Learn More
        </button>
      </section>
      <Footer />
      
    </div>
  );
};

export default Home;