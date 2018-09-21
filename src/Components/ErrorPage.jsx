import React from 'react';
import { Link } from 'react-router-dom'

const ErrorPage = ({location: {state}}) => {
  console.log()
  return (
    <div id="error">
      I AM BECOME ERROR! <br/>
      {state.err.status} <br/>
      {state.err.msg} <br/>

      <Link to={state.from}>FLY YOU FOOLS</Link>
      

    </div>
  );
};

export default ErrorPage;