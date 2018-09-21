import React from 'react';
import { Link } from 'react-router-dom'
import Topics from './Topics';
import PropTypes from 'prop-types'

const NavBar = ({ user, logout }) => {

    return (
        <div id="nav-bar-container"> 

            <Link to={'/ncnews'}>
            <img src="https://cdn-images-1.medium.com/max/1200/1*LdnSztHVYhhd8K8EqlgCJQ.png"
            alt="Northcoders Logo" id="logo"/>
            </Link>

            <ul id="nav-links-bar">

                <li className="nav-link"> <Topics/> </li>      

                <li className="nav-link"><Link to={'/ncnews/articles'}>Articles</Link></li>   

                {!!user.name ? 
                <li className="nav-link-login">
                {user.avatar && <img id="user-avatar" src={user.avater_url} alt="user avatar"/>}
                <p id="logged-in">Logged in as {user.username}</p> <button onClick={logout}>Log Out</button>
                </li> :
                <li className="nav-link-login"><Link to={"/ncnews/users"}>Users</Link></li>} 

                </ul>   
            </div> 
    );
};

NavBar.propTypes = {
    user: PropTypes.object.isRequired
}

export default NavBar;