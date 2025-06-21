import React from 'react';
import './PageNotFound.css';
import pagenotfound from '../Assets/pagenotfound.jpg';

const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <img
        src={pagenotfound}
        alt="404 Not Found"
        className="not-found-image"
      />
      <h1 className="error-code">404</h1>
      <h2 className="error-title">Oops! Page Not Found</h2>
      <p className="error-message">
        The page you’re looking for doesn’t exist.
      </p>
      <a href="/" className="home-link">← Back to Home</a>
    </div>
  );
};

export default PageNotFound;
