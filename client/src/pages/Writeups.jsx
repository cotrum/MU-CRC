import React from 'react';
import PdfUpload from '../components/PdfUpload';
import PdfList from '../components/PdfList';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

const Writeups = () => {
  return (
    <div className="writeups-page">
      <Header />

      <div className="page-header">
        <h1>Past CTF Competition Writeups</h1>
      </div>

      <div className="page-content">
        <section className="upload-section">
          <h2>Upload a Writeup</h2>
          <PdfUpload />
        </section>
      </div>

      <section className="documents-section">
        <h2>Past CTF Writeups</h2>
        <div className="pdf-list">
          <PdfList />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Writeups;
