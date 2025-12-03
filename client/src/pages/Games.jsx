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
      id: 'DDos-defense',
      title: 'DDoS Defense',
      description: 'Defend your network against distributed denial of service attacks!',
      thumbnail: '/images/ddos.png',
      path: '/games/DDoS-Defense-(game)/index.html'
    },
    {
      id: 'dial-spinner',
      title: 'Dial Spinner',
      description: 'Spin the dial to find the correct combination!',
      thumbnail: '/images/dial-spinner.png',
      path: '/games/Dial-Spinner-(game)/index.html'
    },
    {
      id: 'keypad-simon-says',
      title: 'Keypad Simon Says',
      description: 'Remember the sequence and repeat it!',
      thumbnail: '/images/simon-says.png',
      path: '/games/Keypad-Simon-Says-(game)/index.html'
    },
    {
      id: 'matching-game',
      title: 'Matching Game',
      description: 'Match the pairs to win!',
      thumbnail: '/images/matching.png',
      path: '/games/Matching-Game-(game)/index.html'
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

      <div className="page-container">
        <h1 className="page-title">Game Gallery</h1>

        <section className="contact-intro">
          <p className="lead-text">
            Take a break and check out some of our cybersecurity games developed by Dr. Callahan's security researchers!
          </p>
        </section>

        <section className="sponsors-section">
          
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
                {(game.thumbnail?.startsWith('/') || game.thumbnail?.startsWith('http')) ? (
                  <div className="sponsor-placeholder" style={{ padding: '0', background: 'transparent', overflow: 'hidden' }}>
                    <img 
                      src={game.thumbnail} 
                      alt={`${game.title} thumbnail`}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>
                ) : (
                  <div className="sponsor-placeholder">
                    <div className="sponsor-initials" style={{ fontSize: '3rem' }}>
                      {game.thumbnail}
                    </div>
                  </div>
                )}

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
      </div>

      <Footer />
    </>
  );
};

export default GamesGallery;