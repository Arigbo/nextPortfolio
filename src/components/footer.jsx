export default function Footer({name}) {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} {name}. All Rights Reserved.
        </p>
        <div className="footer-links">
          <a href="#" aria-label="LinkedIn" className="footer-link">
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a href="#" aria-label="GitHub" className="footer-link">
            <i className="fab fa-github fa-lg"></i>
          </a>
          <a href="#" aria-label="X" className="footer-link">
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a href="#" aria-label="Instagram" className="footer-link">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
