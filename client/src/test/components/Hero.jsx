import React from 'react';
import '../App.css';


export default function Hero() {
    return (
    <section className="hero">
        <div className="hero-content">
            <h1>Monmouth University Cybersecurity Research Center</h1>
            <p>Join us in advancing cybersecurity education, innovation, and collaboration.</p>
            <button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>Learn More</button>
        </div>
    </section>
    );
}