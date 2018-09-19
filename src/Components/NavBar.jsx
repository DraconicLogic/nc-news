import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Topics from './Topics';

class NavBar extends Component {
    state = {
        links: {}
    }

    componentDidMount () {
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

    render() {
        const { links } = this.state
        return (             
            <ul id="nav-links-bar">

                <li className="nav-link"><Link to={'/ncnews'}>{links.home}</Link></li>

                {/* TOPICS */}
                <li className="nav-link"> <Topics/> </li>      
                {/* TOPICS */}

                <li className="nav-link"><Link to={'/ncnews/articles'}>{links.articles}</Link></li>   

                {!!this.props.user.name ? 
                <li className="nav-link-login"><p>Logged in as {this.props.user.username}</p> <button onClick={this.handleClick}>Log Out</button>
                </li> :
                <li className="nav-link-login"><Link to={"/ncnews/users"}>{links.users}</Link></li>} 

            </ul>       
        );
    }
    
    
    handleClick = () => {
        this.props.logout()

    }

}

export default NavBar;