import React, { useState, useEffect } from 'react';
import '../../css/PdfUpload.css';

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching PDFs from API...');
      
      const response = await fetch('http://localhost:5000/api/pdfs');
      const data = await response.json();
      
      console.log('API response:', data);
      
      if (!response.ok) {
        // If response is not OK, data might be an error object
        throw new Error(data.error || `Server returned ${response.status}`);
      }
      
      // Ensure data is an array
      if (!Array.isArray(data)) {
        console.error('Expected array but got:', typeof data, data);
        throw new Error('Invalid data format received from server');
      }
      
      setPdfs(data);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      setError(error.message || 'Failed to load PDFs. Make sure the server is running on port 5000.');
      setPdfs([]); // Ensure pdfs is always an array
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pdf) => {
    setEditingId(pdf._id);
    setEditName(pdf.name);
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pdfs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName }),
      });

      if (response.ok) {
        setEditingId(null);
        fetchPdfs();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update PDF');
      }
    } catch (error) {
      console.error('Error updating PDF:', error);
      alert('Failed to update PDF: ' + error.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditName('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="pdf-list-container">
        <h2>📚 Your PDF Documents</h2>
        <div className="loading">Loading documents...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pdf-list-container">
        <h2>📚 Your PDF Documents</h2>
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Connection Error</h3>
          <p>{error}</p>
          <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
            Make sure your server is running on port 5000 and MongoDB is connected.
          </p>
          <button onClick={fetchPdfs} className="retry-btn">
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  // Safe rendering - ensure pdfs is always treated as array
  const pdfsToRender = Array.isArray(pdfs) ? pdfs : [];

  return (
    <div className="pdf-list-container">
      <h2>📚 Your PDF Documents</h2>
      
      {pdfsToRender.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <h3>No PDFs uploaded yet</h3>
          <p>Upload your first PDF document to get started!</p>
        </div>
      ) : (
        <div className="pdfs-grid">
          {pdfsToRender.map((pdf) => (
            <div key={pdf._id} className="pdf-card">
              {editingId === pdf._id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="edit-input"
                    placeholder="Enter new name..."
                  />
                  <div className="edit-actions">
                    <button onClick={() => handleUpdate(pdf._id)} className="save-btn">
                      💾 Save
                    </button>
                    <button onClick={handleCancel} className="cancel-btn">
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="pdf-header">
                    <h3>{pdf.name}</h3>
                    <button 
                      onClick={() => handleEdit(pdf)}
                      className="edit-btn"
                      title="Rename document"
                    >
                      ✏️
                    </button>
                  </div>
                  
                  <div className="pdf-details">
                    <p><strong>Original filename:</strong> {pdf.originalName}</p>
                    <p><strong>File size:</strong> {formatFileSize(pdf.size)}</p>
                    <p><strong>Uploaded:</strong> {formatDate(pdf.uploadDate)}</p>
                    <p><strong>Last updated:</strong> {formatDate(pdf.lastUpdated)}</p>
                  </div>
                  
                  <div className="card-actions">
                    <a 
                      href={`http://localhost:5000/uploads/${pdf.filename}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-btn"
                    >
                      👁️ View PDF
                    </a>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PdfList;