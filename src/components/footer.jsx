import React from "react";

export default function Footer({ name }) {
  return (
    <footer className="footer" style={{ borderBlockStart: "1px solid var(--border-color)", paddingBlock: "2rem", width: "100%", backgroundColor: "var(--card-bg)" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90%", maxWidth: "1200px", margin: "0 auto", flexWrap: "wrap", gap: "1rem" }}>
        <p className="footer-text" style={{ fontSize: "0.9rem", opacity: "0.7", margin: "0" }}>
          &copy; {new Date().getFullYear()} {name}. All Rights Reserved.
        </p>
        <div className="footer-links" style={{ display: "flex", gap: "1.5rem" }}>
          <a href="https://linkedin.com/in/ArigboJesse" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-link">
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a href="https://github.com/Arigbo" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-link">
            <i className="fab fa-github fa-lg"></i>
          </a>
          <a href="https://x.com/anc13nt2?s=09" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="footer-link">
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a href="mailto:arigbojesse@gmail.com" aria-label="Email" className="footer-link">
            <i className="fas fa-envelope fa-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
