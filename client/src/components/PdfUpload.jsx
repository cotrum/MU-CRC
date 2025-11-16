import React, { useState, useEffect } from 'react';
import './PdfUpload.css';

const PdfUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfName, setPdfName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedFile = sessionStorage.getItem('selectedFile');
    const savedName = sessionStorage.getItem('pdfName');
    if (savedFile) setSelectedFile(JSON.parse(savedFile));
    if (savedName) setPdfName(savedName);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setPdfName(file.name.replace('.pdf', ''));
      setMessage('');
      sessionStorage.setItem('selectedFile', JSON.stringify({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      sessionStorage.setItem('pdfName', file.name.replace('.pdf', ''));
    } else {
      setSelectedFile(null);
      setMessage('Please select a valid PDF file');
      sessionStorage.removeItem('selectedFile');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a PDF file first');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('pdf', selectedFile);
    formData.append('name', pdfName || selectedFile.name.replace('.pdf', ''));

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ ${data.message}`);
        setSelectedFile(null);
        setPdfName('');
        document.getElementById('pdf-file').value = '';
        sessionStorage.removeItem('selectedFile');
        sessionStorage.removeItem('pdfName');
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Upload failed. Please make sure the server is running.');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pdf-upload-container">
      <div className="upload-card">
        <h3>Upload Research Document</h3>
        <p className="upload-subtitle">Share your cybersecurity research papers and documents</p>
        
        <div className="upload-form">
          <div className="form-group">
            <label htmlFor="pdf-file" className="file-label">
              Choose PDF File
            </label>
            <input
              type="file"
              id="pdf-file"
              accept=".pdf"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pdf-name" className="text-label">
              Document Title
            </label>
            <input
              type="text"
              id="pdf-name"
              value={pdfName}
              onChange={(e) => {
                setPdfName(e.target.value);
                sessionStorage.setItem('pdfName', e.target.value);
              }}
              placeholder="Enter a title for this research document"
              className="text-input"
            />
          </div>

          {selectedFile && (
            <div className="file-info">
              <h4>File Details:</h4>
              <p><strong>Filename:</strong> {selectedFile.name}</p>
              <p><strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              <p><strong>Type:</strong> PDF Document</p>
            </div>
          )}

          <button 
            onClick={handleUpload} 
            disabled={!selectedFile || uploading}
            className={`upload-button ${uploading ? 'uploading' : ''}`}
          >
            {uploading ? (
              <>
                <span className="spinner"></span>
                Uploading...
              </>
            ) : (
              'Upload Research Document'
            )}
          </button>

          {message && (
            <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfUpload;