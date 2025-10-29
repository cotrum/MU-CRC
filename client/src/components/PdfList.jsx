import React, { useState, useEffect } from 'react';
import '../../css/PdfUpload.css';

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pdfs');
      const data = await response.json();
      setPdfs(data);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
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
        fetchPdfs(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating PDF:', error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditName('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="pdf-list-container">
      <h2>Uploaded PDFs</h2>
      
      {pdfs.length === 0 ? (
        <p>No PDFs uploaded yet.</p>
      ) : (
        <div className="pdfs-grid">
          {pdfs.map((pdf) => (
            <div key={pdf._id} className="pdf-card">
              {editingId === pdf._id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="edit-input"
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
                  <h3>{pdf.name}</h3>
                  <p><strong>Original:</strong> {pdf.originalName}</p>
                  <p><strong>Size:</strong> {formatFileSize(pdf.size)}</p>
                  <p><strong>Uploaded:</strong> {formatDate(pdf.uploadDate)}</p>
                  <p><strong>Last Updated:</strong> {formatDate(pdf.lastUpdated)}</p>
                  
                  <div className="card-actions">
                    <button 
                      onClick={() => handleEdit(pdf)}
                      className="edit-btn"
                    >
                      Rename
                    </button>
                    <a 
                      href={`http://localhost:5000/uploads/${pdf.filename}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-btn"
                    >
                      View PDF
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