import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Events from './pages/Events.jsx';
import Sponsorship from './pages/Sponsorship.jsx';
import Contact from './pages/Contact.jsx';
import Writeups from './pages/Writeups.jsx';
import Login from './pages/Login.jsx'; 
import Signup from './pages/Signup.jsx';
import Header from './components/Header.jsx';
import Games from './pages/Games.jsx';

function App() {
  
  const [updateCount, setUpdateCount] = useState(0);
  const triggerUpdate = () => setUpdateCount(prev => prev + 1);

  return (
    <Router>
      <div className="App">
        
        <Header update={triggerUpdate} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sponsorship" element={<Sponsorship />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/writeups" element={<Writeups />} />
          <Route path="/login" element={<Login onLogin={triggerUpdate} />} />
          <Route path="/register" element={<Signup onSignup={triggerUpdate} />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
