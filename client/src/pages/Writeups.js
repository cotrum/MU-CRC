import React from 'react';
import PdfUpload from '../components/PdfUpload';
import PdfList from '../components/PdfList';

const Writeups = () => {
  return (
    <div className="writeups-page">
      <h1>Research Documents & Writeups</h1>
      <p>Access and upload cybersecurity research documents and writeups</p>
      
      <div className="pdf-sections">
        <section className="upload-section">
          <h2>Upload New Document</h2>
          <PdfUpload />
        </section>
        
        <section className="documents-section">
          <h2>Available Documents</h2>
          <PdfList />
        </section>
      </div>
    </div>
  );
};

export default Writeups;