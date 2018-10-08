import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class Login extends Component {
  state = {
    username: "cooljmessy"
  };

  render() {
    const { user } = this.props;
    if (!!user._id) return <Redirect to="/" />;
    return (
      <div id="login">
        <form onSubmit={this.handleSubmit}>
          User name:
          <input type="text" defaultValue="cooljmessy" />
          Password
          <input type="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username } = this.state;
    this.props.login(username);
  };

}
Login.propTypes = {
  user: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired
};
export default Login;
