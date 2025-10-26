import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  // Fetch from your backend API
  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>MERN Stack App</h1>
      <p>Backend says hi: {message}</p>
    </div>
  );
}

export default App;
