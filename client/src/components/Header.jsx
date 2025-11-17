import React from "react";
import "../App.css";
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
                <Link to="/about">About</Link>
                <Link to="/events">Events</Link>
                <Link to="/sponsorship">Sponsorship</Link>
                <Link to="/writeups">Writeups</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    );
}
