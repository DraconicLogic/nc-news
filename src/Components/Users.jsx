import React, { Component } from 'react';
import {  Redirect  } from 'react-router-dom';
import PropTypes from 'prop-types';



class Users extends Component {
    state = {
        username: ''
    }

    componentDidMount() {
        const newUsername = "cooljmessy"
        this.setState({
            username: newUsername
        })
    }

    render() {
        console.log(this.props)
        const { user } = this.props
        if (!!user._id) return <Redirect to="/ncnews"/>
        return (
            <div className="users">
                <form onSubmit={this.handleSubmit}>
                    User name:<input type="text" defaultValue="cooljmessy"/>
                    Password<input type="password" />
                    <input type="submit" value="Login"/>
                </form>
            </div>
        );
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
        const {username} = this.state
        this.props.login(username)
    }
}
Users.propTypes = {
    user: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired
}
export default Users;