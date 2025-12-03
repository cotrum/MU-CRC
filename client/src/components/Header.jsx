import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";  
import "../styles/layout.css";

export default function Header({ update }) {
    const loggedIn = !!localStorage.getItem('token'); 
    const userName = localStorage.getItem('loggedInUser') || "";

    function logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('role');
        if (update) update(); 
        window.location.href = "/";
    }

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
                <Link to="/writeups">CTF WRITEUPS</Link>
                <Link to="/games">GAMES</Link>
                <Link to="/contact">CONTACT</Link>

                {loggedIn ? (
                    <>
                        <a onClick={logOut} style={{ cursor: 'pointer' }}>LOG OUT</a>
                    </>
                ) : (
                    <Link to="/login">LOG IN</Link>
                )}
            </nav>
        </header>
    );
}