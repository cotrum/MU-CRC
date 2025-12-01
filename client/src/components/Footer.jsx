import React from "react";
import "./Footer.css"; 

export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 Monmouth University Cybersecurity Research Center</p>

      <div className="socials">
        <a href="mailto:mucrc@monmouth.edu">Email</a>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <small>All rights reserved.</small>
    </footer>
  );
}
