const Loader = () => (
  <div className="loader-wrapper">
    <div className="loader-content">
      <div className="loader-logo">
        <svg width="52" height="52" viewBox="0 0 36 36" fill="none">
          <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" fill="#B8860B" opacity="0.9" />
          <polygon points="18,6 30,12 30,24 18,30 6,24 6,12" fill="#111111" />
          <polygon points="18,10 26,14 26,22 18,26 10,22 10,14" fill="#B8860B" opacity="0.6" />
        </svg>
      </div>
      <div className="loader-text">
        <span className="logo-deep">DEEP</span>
        <span className="logo-net">NET</span>
        <span className="logo-soft">SOFT</span>
      </div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
    </div>
  </div>
);

export default Loader;