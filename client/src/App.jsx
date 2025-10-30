import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './test/components/Header.jsx';
import Hero from './test/components/Hero.jsx';
import Section from './test/components/Section.jsx';
import Footer from './test/components/Footer.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
   /* <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>*/
     <div className="App">
                <Header />
                <Hero />
                <Section id="about" title="About the CRC" bg="white">
                    <p>The Cybersecurity Research Center (CRC) at Monmouth University provides a collaborative environment for students and faculty to research, develop, and advance cybersecurity technologies and education.</p>
                </Section>
                <Section id="research" title="Research & Initiatives" bg="blue-50" />
                <Section id="events" title="Upcoming Events" bg="white" />
                <Section id="sponsorship" title="Partner With Us" bg="blue-50" />
                <Footer />
      </div>
  )
 
}

export default App
