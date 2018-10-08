import React from 'react';
import { Link } from 'react-router-dom'

const ErrorPage = ({location: {state}}) => {
  return (
    <div id="error">
      I AM BECOME ERROR! <br/>
      {state.err.status} <br/>
      {state.err.msg} <br/>
      <Link to={state.from}>RETURN FROM WHENCE YOU CAME</Link>
    </div>
  );
};

export default ErrorPage;