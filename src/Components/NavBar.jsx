import React from "react";
import { Link } from "react-router-dom";
import Topics from "./TopicsDropdown";
import PropTypes from "prop-types";

const NavBar = ({ user, logout }) => {
  return (
    <div id="nav-bar-container">
      <Link to={"/"}>
        <img
          src="https://cdn-images-1.medium.com/max/1200/1*LdnSztHVYhhd8K8EqlgCJQ.png"
          alt="Northcoders Logo"
          id="logo"
        />
      </Link>

      <ul id="nav-links-bar">
        <li >
          <Link className="nav-link" to={"/articles"}>Articles</Link>
        </li>

        <li className="nav-link">
          {" "}
          <Topics />{" "}
        </li>

        {!!user.name ? (
          <li className="nav-link-login">
            {user.avatar && (
              <img id="user-avatar" src={user.avater_url} alt="user avatar" />
            )}
            <p id="logged-in">Logged in as {user.username}</p>
            <Link to={"/logout"}>
              <button onClick={logout}>Log Out</button>
            </Link>
          </li>
        ) : (
          <li className="nav-link-login">
            <Link className="nav-link" to={"/login"}>Log In</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.function
};

export default NavBar;
