import React from 'react';

const Home = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <header style={{ 
        background: '#004080', 
        color: 'white', 
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2>Monmouth University Cybersecurity Research Center</h2>
        <nav>
          <a href="/writeups" style={{ color: 'white', marginLeft: '1rem', textDecoration: 'none' }}>Writeups</a>
          <a href="/pdfupload" style={{ color: 'white', marginLeft: '1rem', textDecoration: 'none' }}>Upload</a>
        </nav>
      </header>

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
          onClick={() => window.location.href = '/writeups'}
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
          View Research Documents
        </button>
      </section>

      <footer style={{ 
        background: '#fff', 
        borderTop: '1px solid #ddd', 
        padding: '2rem', 
        textAlign: 'center', 
        color: '#666' 
      }}>
        <p>© 2025 Monmouth University Cybersecurity Research Center</p>
      </footer>
    </div>
  );
};

export default Home;