import React, { useState } from 'react';
import PdfUpload from '../components/PdfUpload';
import PdfList from '../components/PdfList';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import "../styles/global.css";
import "../styles/layout.css";

const Writeups = () => {
  const loggedIn = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const isMember = loggedIn && userRole === 'member';
  const isAdmin = loggedIn && userRole === 'admin';

  return (
    <>
    
      <div className="page-container">
        <h1 className="page-title">CRC CTF Team Writeups</h1>
    <div className="section-box">
          <PdfList />
        </div>

        {/* Allow both members AND admins to upload */}
        {isMember || isAdmin ? (
          <>
            <h2 className="section-title">Upload a Writeup</h2>
            <div className="section-box">
              <PdfUpload />
            </div>
          </>
        ) : (
          <>
            <h2 className="section-title">Upload a Writeup</h2>
            <div className="section-box">
              <p>You must be a member to upload writeups.</p>
            </div>
          </>
        )}
     
    </div>
    <Footer />
    </>
  );
};

export default Writeups;