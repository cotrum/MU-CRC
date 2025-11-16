import React, { useState, useEffect } from 'react';
import './PdfList.css';

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
      const response = await fetch('http://localhost:5000/api/pdfs');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Server returned ${response.status}`);
      }
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received from server');
      }
      
      setPdfs(data);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      setError(error.message || 'Failed to load documents. Make sure the server is running on port 5000.');
      setPdfs([]);
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
        throw new Error(errorData.error || 'Failed to update document');
      }
    } catch (error) {
      console.error('Error updating PDF:', error);
      alert('Failed to update document: ' + error.message);
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
        <div className="loading">Loading research documents...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pdf-list-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Connection Error</h3>
          <p>{error}</p>
          <button onClick={fetchPdfs} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const pdfsToRender = Array.isArray(pdfs) ? pdfs : [];

  return (
    <div className="pdf-list-container">
      {pdfsToRender.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <h3>No research documents uploaded yet</h3>
          <p>Upload your first research document to get started!</p>
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
                    placeholder="Enter new document title..."
                  />
                  <div className="edit-actions">
                    <button onClick={() => handleUpdate(pdf._id)} className="save-btn">
                      Save
                    </button>
                    <button onClick={handleCancel} className="cancel-btn">
                      Cancel
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
                      Edit Title
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
                      View Document
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