import React from "react";
import "./Header.css";  
import "../styles/layout.css";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="header-logo">
                <img 
                    src="/logos/White/horizontal/MU-Primary Logo-WHITE_cybersecurity.png"
                    alt="Monmouth University"
                />
            </Link>

            <nav className="header-nav">
                <Link to="/about">ABOUT</Link>
                <Link to="/events">EVENTS</Link>
                <Link to="/sponsorship">SPONSORSHIP</Link>
                <Link to="/writeups">WRITEUPS</Link>
                <Link to="/contact">CONTACT</Link>
            </nav>
        </header>
    );
}
