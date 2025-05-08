import React from 'react';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <div className="not-found-container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <a href="/home" className="home-button">Go to Home</a>
      </div>
    </div>
  );
};

export default PageNotFound;