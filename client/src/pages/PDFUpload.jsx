import React from 'react';
import PdfUpload from '../components/PdfUpload';
import PdfList from '../components/PdfList';
import './PDFUpload.css'; // You'll need to create this

const PDFUpload = () => {
  return (
    <div className="pdf-upload-page">
      <div className="page-header">
        <h1>Research Document Upload</h1>
        <p>Upload and manage cybersecurity research papers and documents</p>
      </div>
      
      <div className="page-content">
        <section className="upload-section">
          <h2>Upload New Document</h2>
          <PdfUpload />
        </section>
        
        <section className="documents-section">
          <h2>Document Library</h2>
          <PdfList />
        </section>
      </div>
    </div>
  );
};

export default PDFUpload;