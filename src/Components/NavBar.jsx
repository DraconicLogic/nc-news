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
        const { user } = this.props
        const { links } = this.state
        return (             
            <div id="nav-bar-container">
                

                <img src="https://cdn-images-1.medium.com/max/1200/1*LdnSztHVYhhd8K8EqlgCJQ.png"
                alt="Northcoders Logo" id="logo"/>
                <ul id="nav-links-bar">

                    <li className="nav-link"><Link to={'/ncnews'}>{links.home}</Link></li>

                    <li className="nav-link"> <Topics/> </li>      

                    <li className="nav-link"><Link to={'/ncnews/articles'}>{links.articles}</Link></li>   

                    {!!user.name ? 
                    <li className="nav-link-login">
                    {user.avatar && <img id="user-avatar" src={user.avater_url} alt="user avatar"/>}
                    <p id="logged-in">Logged in as {this.props.user.username}</p> <button onClick={this.handleClick}>Log Out</button>
                    </li> :
                    <li className="nav-link-login"><Link to={"/ncnews/users"}>{links.users}</Link></li>} 

                </ul>   
            </div>    
        );
    }
    
    
    handleClick = () => {
        this.props.logout()

    }

}

export default NavBar;