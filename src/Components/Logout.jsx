import React from 'react';
import {  Link  } from 'react-router-dom'

const Logout = () => {
    return (
        <div >
            <h3 className="logout-msg">You have successfully logged out.</h3>
            <Link to={"/"}>Return to Home Page</Link>
        </div>
    );
};

export default Logout;