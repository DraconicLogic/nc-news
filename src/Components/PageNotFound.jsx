import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div id="fourohfour">
      404 Page Not Found 
      <Link to="/"> Return Home</Link>
    </div>
  );
};

export default PageNotFound;