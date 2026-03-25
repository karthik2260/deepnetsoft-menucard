import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../config/constants/constants';

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" fill="#B8860B" opacity="0.9"/>
              <polygon points="18,6 30,12 30,24 18,30 6,24 6,12" fill="#1a1a1a"/>
              <polygon points="18,10 26,14 26,22 18,26 10,22 10,14" fill="#B8860B" opacity="0.6"/>
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-deep">DEEP</span>
            <span className="logo-net">NET</span>
            <span className="logo-soft">SOFT</span>
          </div>
        </Link>

        <nav className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>
      </div>

      {mobileOpen && (
        <nav className="mobile-nav">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;