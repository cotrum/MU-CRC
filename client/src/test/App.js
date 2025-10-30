import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Section from './components/Section';
import Footer from './components/Footer';


export default function App() {
    return (
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
    );
}