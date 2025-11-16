import React from 'react';
import PdfUpload from '../components/PdfUpload';
import PdfList from '../components/PdfList';

const Writeups = () => {
  return (
    <div className="writeups-page">
      <div className="page-header">
        <h1>Research Writeups & Documents</h1>
        <p>Access and contribute to our collection of cybersecurity research and writeups</p>
      </div>
      
      <div className="page-content">
        <section className="upload-section">
          <h2>Contribute a Writeup</h2>
          <PdfUpload />
        </section>
        
        <section className="documents-section">
          <h2>Available Writeups</h2>
          <PdfList />
        </section>
      </div>
    </div>
  );
};

export default Writeups;