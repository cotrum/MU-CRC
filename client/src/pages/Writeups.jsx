import React, { useState } from 'react';
import PdfUpload from '../components/PdfUpload';
import PdfList from '../components/PdfList';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import "../styles/global.css";
import "../styles/layout.css";

const Writeups = () => {
  const loggedIn = !!localStorage.getItem('token');

  return (
    <>
  
    <div className="page-container">

      <h1 className="page-title">Past CTF Competition Writeups</h1>

      

    
      {loggedIn ?
        ( <>
          <h2 className="section-title">Upload a Writeup</h2>
      <div className="section-box">

        <PdfUpload />
      
      </div></>)
        :
        (<>
          <h2 className="section-title">Upload a Writeup</h2>
          <div className="section-box">
            <p>You must log in to upload writeups.</p>
          </div>
        </>)
      }
        
      

      <h2 className="section-title">Past CTF Writeups</h2>
      <div className="section-box">
        <PdfList />
      </div>

    </div>
    <Footer />
    </>
  );
};

export default Writeups;

