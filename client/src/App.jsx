import React from 'react'
import PdfUpload from './components/PdfUpload'
import PdfList from './components/PdfList'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src="/react.svg" className="logo react" alt="React logo" />
          </a>
          <h1>PDF Management System</h1>
        </div>
        <p className="app-subtitle">Upload, manage, and organize your PDF documents</p>
      </header>

      <main className="app-main">
        <div className="app-container">
          <section className="upload-section">
            <PdfUpload />
          </section>
          
          <section className="list-section">
            <PdfList />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with Vite + React</p>
      </footer>
    </div>
  )
}

export default App