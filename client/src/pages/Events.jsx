import React from 'react';
import Footer from "../components/Footer.jsx"
import Header from "../components/Header.jsx"

const Events = () => {
  return (
    <div>
      <Header />
      <div className="page-container">
        <h1 className="page-title">Events Calendar</h1>
        <iframe
        src="https://outlook.office365.com/owa/calendar/911c64dd96e54c01aa6208421868645d@rpi.edu/051a8861feda43d0871df85155911a5015038586886625751096/calendar.html"
        style={{ border: 0, width: "100%", height: "1000px" }}
        title="Outlook Calendar"
      ></iframe>
      </div>
      <Footer />
    </div>
  );
};

export default Events;