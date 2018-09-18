import React, { Component } from 'react';



class Users extends Component {
    state = {
        username: ''
    }
    
    render() {
        
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
    componentDidMount() {
        const newUsername = "cooljmessy"
        this.setState({
            username: newUsername
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const username = this.state.username
        this.props.login(username)
    }
}

export default Users;