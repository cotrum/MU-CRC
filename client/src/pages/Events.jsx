import React from 'react';
import Footer from "../components/Footer.jsx"
import Header from "../components/Header.jsx"

const Events = () => {
  return (
    <div>
      <Header />
      <h1>Events</h1>
      <p>Upcoming cybersecurity events and workshops.</p>
      <iframe 
    src="https://outlook.office365.com/owa/calendar/911c64dd96e54c01aa6208421868645d@rpi.edu/051a8861feda43d0871df85155911a5015038586886625751096/calendar.html"
    style="border:0" 
    width="100%" 
    height="600" 
    frameborder="0">
</iframe>

      
      <Footer />
    </div>
  );
};

export default Events;