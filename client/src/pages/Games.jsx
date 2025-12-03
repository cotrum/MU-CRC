import React, { useState } from 'react';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import "../styles/global.css";
import "../styles/layout.css";

const GamesGallery = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 'cypher-decryption',
      title: 'Cypher Decryption',
      description: 'Can you break the cypher?',
      thumbnail: '/images/cypher-decrypt.png',
      path: '/games/Cypher-Decryption-(game)/index.html'
    },
    {
      id: 'memory-game',
      title: 'Memory Match',
      description: 'Find matching pairs and challenge your memory!',
      thumbnail: '🧠',
      path: '/games/memory-game/index.html'
    },
    {
      id: 'snake',
      title: 'Snake Game',
      description: 'Classic snake game - eat and grow!',
      thumbnail: '🐍',
      path: '/games/snake/index.html'
    }
  ];

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const handleBack = () => {
    setSelectedGame(null);
  };

  if (selectedGame) {
    return (
      <>
        <div className="page-container">
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={handleBack}
              className="btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              ← Back to Games
            </button>
          </div>
          
          <h1 className="page-title">{selectedGame.title}</h1>
          
          <div style={{ width: '100%', height: 'calc(100vh - 300px)', minHeight: '600px' }}>
            <iframe
              src={selectedGame.path}
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
              title={selectedGame.title}
            />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="page-container">
        <h1 className="page-title">Games Gallery</h1>

        <section className="section-box content-narrow">
          <p className="lead-text">
            Check out some of our educational cybersecurity games developed by Dr. Callahan's security researchers!
          </p>
        </section>

        <section className="sponsors-section">
          <h2 className="section-title section-title--center">Available Games</h2>

          <div className="sponsors-grid">
            {games.map((game) => (
              <div
                key={game.id}
                className="sponsor-card cyber-border"
                onClick={() => handleGameClick(game)}
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div className="sponsor-placeholder">
                  <div className="sponsor-initials" style={{ fontSize: '3rem' }}>
                    {game.thumbnail}
                  </div>
                </div>

                <div className="sponsor-info">
                  <h3 className="sponsor-name">{game.title}</h3>
                  <p className="sponsor-level">{game.description}</p>
                  <span className="sponsor-link" style={{ cursor: 'pointer' }}>
                    Play Now →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-box content-narrow" style={{ marginTop: '3rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Project Structure</h3>
          <pre style={{ 
            background: 'var(--color-bg-secondary, #f5f5f5)', 
            padding: '1rem', 
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.9rem'
          }}>
{`/public
  /games
    /whack-a-mole
      index.html
      style.css
      script.js
    /memory-game
      index.html
      style.css
      script.js
    /snake
      index.html
      style.css
      script.js`}
          </pre>
          <p style={{ marginTop: '1rem' }}>
            Place your game folders in the <code style={{ 
              background: 'var(--color-bg-secondary, #f5f5f5)', 
              padding: '0.2rem 0.5rem', 
              borderRadius: '4px' 
            }}>public/games</code> directory. Each game should have its own folder with all its assets.
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default GamesGallery;