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
        src="https://outlook.office365.com/owa/calendar/911c64dd96e54c01aa6208421868645d@rpi.edu/9967a24c3b4c4bb39842bc96654be9b35403998818310970382/calendar.html"
        style={{ border: 0, width: "100%", height: "1000px" }}
        title="Outlook Calendar"
      ></iframe>
      </div>
      <Footer />
    </div>
  );
};

export default Events;