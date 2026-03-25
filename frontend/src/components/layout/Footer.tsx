import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-col">
        <h4 className="footer-heading">CONNECT WITH US</h4>
        <div className="footer-contact-item">
          <span className="footer-icon">📞</span>
          <span>+91 9562 03 3433</span>
        </div>
        <div className="footer-contact-item">
          <span className="footer-icon">✉</span>
          <span>info@deepnetsoft.com</span>
        </div>
      </div>

      <div className="footer-center">
        <div className="footer-logo">
          <svg width="44" height="44" viewBox="0 0 36 36" fill="none">
            <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" fill="#B8860B" opacity="0.9"/>
            <polygon points="18,6 30,12 30,24 18,30 6,24 6,12" fill="#1a1a1a"/>
            <polygon points="18,10 26,14 26,22 18,26 10,22 10,14" fill="#B8860B" opacity="0.6"/>
          </svg>
        </div>
        <div className="footer-logo-text">
          <span className="logo-deep">DEEP</span>
          <span className="logo-net"> NET </span>
          <span className="logo-soft">SOFT</span>
        </div>
        <div className="footer-socials">
          <a href="#" className="social-link" aria-label="Facebook">f</a>
          <a href="#" className="social-link" aria-label="Twitter">𝕏</a>
          <a href="#" className="social-link" aria-label="YouTube">▶</a>
          <a href="#" className="social-link" aria-label="Instagram">◎</a>
        </div>
      </div>

      <div className="footer-col footer-right">
        <h4 className="footer-heading">FIND US</h4>
        <div className="footer-contact-item">
          <span className="footer-icon">📍</span>
          <span>First floor, Geo infopark,<br />Infopark EXPY, Kakkanad</span>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <span>© 2024 Deepnetsoft Solutions. All rights reserved.</span>
      <div className="footer-bottom-links">
        <Link to="/terms">Terms & Conditions</Link>
        <span className="divider">|</span>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
    </div>
  </footer>
);

export default Footer;