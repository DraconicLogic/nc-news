import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class NavBar extends Component {
    state = {
        links: {}
    }
    render() {
        return (             
            <ul className="nav-links-bar">
                <li className="nav-link"><Link to={'/ncnews'}>{this.state.links.home}</Link></li>
                <li className="nav-link"><Link to={"/ncnews/topics"}>{this.state.links.topics}</Link></li>                    
                <li className="nav-link"><Link to={'/ncnews/articles'}>{this.state.links.articles}</Link></li>            
                {!!this.props.user.name ? 
                <li className="nav-link-login"><p>Logged in as {this.props.user.username}</p> <button onClick={this.handleClick}>Log Out</button>
                </li> :
                <li className="nav-link-login"><Link to={"/ncnews/users"}>{this.state.links.users}</Link></li>}                         
            </ul>       
        );
    }
    componentDidMount (){
        const navLinks = {
            home: 'Home',
            topics: 'Topics',
            articles: 'Articles',
            users: 'Users'
        }
        this.setState({
            links: navLinks
        })
    }
    handleClick = () => {
        this.props.logout()

    }

}

export default NavBar;