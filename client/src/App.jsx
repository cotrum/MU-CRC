import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Events from './pages/Events.jsx';
import Sponsorship from './pages/Sponsorship.jsx';
import Contact from './pages/Contact.jsx';
import Writeups from './pages/Writeups.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sponsorship" element={<Sponsorship />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/writeups" element={<Writeups />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;