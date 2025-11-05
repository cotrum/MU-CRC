import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Section from './components/Section'
import Footer from './components/Footer'
import PdfUpload from './components/PdfUpload'
import PdfList from './components/PdfList'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      
      <Section id="upload" title="PDF Document Management" bg="white">
        <div className="pdf-management-section">
          <PdfUpload />
        </div>
      </Section>
      
      <Section id="documents" title="Uploaded Documents" bg="blue-50">
        <PdfList />
      </Section>
      
      <Footer />
    </div>
  )
}

export default App