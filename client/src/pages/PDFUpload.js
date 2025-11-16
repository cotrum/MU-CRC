import React from 'react';
import PdfUpload from '../components/PdfUpload';
import PdfList from '../components/PdfList';

const PDFUpload = () => {
  return (
    <div className="pdf-upload-page">
      <section className="upload-section">
        <h1>Upload Research Documents</h1>
        <p>Share your cybersecurity research papers and documents with the community</p>
        <PdfUpload />
      </section>
      
      <section className="documents-section">
        <h2>Research Document Library</h2>
        <PdfList />
      </section>
    </div>
  );
};

export default PDFUpload;