import React from 'react';
import '../App.css';


export default function Header() {
    return (
        <header className="header">
        <div className="logo-area">
            <img src="https://upload.wikimedia.org/wikipedia/en/3/38/Monmouth_University_logo.png" alt="Monmouth University Logo" />
            <span>Cybersecurity Research Center</span>
        </div>
        <nav>
            <a href="#about">About</a>
            <a href="#research">Research</a>
            <a href="#events">Events</a>
            <a href="#sponsorship">Sponsorship</a>
            <a href="#contact">Contact</a>
        </nav>
        </header>
);
}