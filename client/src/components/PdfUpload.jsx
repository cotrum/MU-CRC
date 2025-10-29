import React, { useState } from 'react';
import '../../css/PdfUpload.css';

const PdfUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfName, setPdfName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      // Set default name to filename without extension
      setPdfName(file.name.replace('.pdf', ''));
      setMessage('');
    } else {
      setSelectedFile(null);
      setMessage('Please select a valid PDF file');
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
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pdf-upload-container">
      <h2>Upload PDF</h2>
      
      <div className="upload-form">
        <div className="form-group">
          <label htmlFor="pdf-file">Select PDF File:</label>
          <input
            type="file"
            id="pdf-file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pdf-name">PDF Name:</label>
          <input
            type="text"
            id="pdf-name"
            value={pdfName}
            onChange={(e) => setPdfName(e.target.value)}
            placeholder="Enter a name for this PDF"
          />
        </div>

        {selectedFile && (
          <div className="file-info">
            <p><strong>Selected File:</strong> {selectedFile.name}</p>
            <p><strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}

        <button 
          onClick={handleUpload} 
          disabled={!selectedFile || uploading}
          className="upload-button"
        >
          {uploading ? 'Uploading...' : 'Upload PDF'}
        </button>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfUpload;