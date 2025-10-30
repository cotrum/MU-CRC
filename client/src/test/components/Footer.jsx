import React from 'react';
import '../../App.css';


export default function Footer() {
    return (
        <footer className="footer">
            <p>© 2025 Monmouth University Cybersecurity Research Center</p>
            <div className="socials">
                <a href="https://www.linkedin.com/school/monmouth-university/" target="_blank" rel="noreferrer">LinkedIn</a>
                <span>·</span>
                <a href="mailto:crc@monmouth.edu">Email</a>
            </div>
        </footer>
    );
}
