import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not-found">
    <h1 className="not-found-title">404</h1>
    <p className="not-found-subtitle">Page not found</p>
    <Link to="/" className="btn-submit">GO HOME</Link>
  </div>
);

export default NotFound;