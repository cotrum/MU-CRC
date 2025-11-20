import React, { useState, useEffect } from 'react';
import './PdfList.css';

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('http://localhost:5000/api/pdfs');
      
      if (!response.ok) {
        // If we get a 500 error, MongoDB is not connected
        throw new Error('Server error: Cannot connect to database');
      }
      
      const data = await response.json();
      
      // Double-check that data is an array
      if (!Array.isArray(data)) {
        throw new Error('Invalid data received from server');
      }
      
      setPdfs(data);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      setError('Cannot load documents. Please check if MongoDB is running and connected.');
      setPdfs([]); // Always set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Safe rendering - always treat as array
  const pdfsToRender = Array.isArray(pdfs) ? pdfs : [];

  if (loading) {
    return (
      <div className="pdf-list-container">
        <div className="loading">Loading documents...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pdf-list-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Database Connection Error</h3>
          <p>{error}</p>
          <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
            Make sure MongoDB is running and your server can connect to it.
          </p>
          <button onClick={fetchPdfs} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-list-container">
      {pdfsToRender.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <h3>No documents uploaded yet</h3>
          <p>Upload your first CTF writeup to get started!</p>
        </div>
      ) : (
        <div className="pdfs-grid">
          {pdfsToRender.map((pdf) => (
            <div key={pdf._id} className="pdf-card">
              <h3>{pdf.name || 'Untitled Document'}</h3>
              <div className="pdf-details">
                <p><strong>Filename:</strong> {pdf.originalName}</p>
                <p><strong>Size:</strong> {pdf.size ? (pdf.size / 1024 / 1024).toFixed(2) + ' MB' : 'Unknown'}</p>
                <p><strong>Uploaded:</strong> {pdf.uploadDate ? new Date(pdf.uploadDate).toLocaleDateString() : 'Unknown'}</p>
              </div>
              <div className="card-actions">
                <a 
                  href={`http://localhost:5000/uploads/${pdf.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-btn"
                >
                  View PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PdfList;