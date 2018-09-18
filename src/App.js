import React, { Component } from 'react';
import './App.css';
import Articles from './Components/Articles.jsx'
import {Route, Redirect} from 'react-router-dom'
import Article from './Components/Article.jsx'
import Topics from './Components/Topics.jsx'
import TopicArticles from './Components/TopicArticles.jsx'
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import Users from './Components/Users'
import * as api from './Api.js'
import Logout from './Components/Logout'

class App extends Component {
  state = {
    user: {}
  }
  render() {
    return (
      <div id="App">
      <NavBar user={this.state.user} logout={this.handleLogOut}/>
      <div className='content'>
      <Route exact path="/" component={Home} />
      <Route exact path="/ncnews" component={Home}/>
      <Route exact path="/ncnews/topics" component={Topics} />
      <Route exact path="/ncnews/articles" component={Articles} />
      <Route exact path="/ncnews/users" render={() => <Users login={this.handleLogin}/>} />
      <Route exact path="/ncnews/logout" component={Logout}/>

      <Route exact path="/ncnews/articles/:articleid"
       render={(params) => <Article id={params} user={this.state.user} />} />
      <Route exact path="/ncnews/topics/:topic_slug/articles" component={TopicArticles}/>
      </div>
      </div>
    );
  }
  componentDidMount(){

  }
   handleLogin = (username) => {
     api.getUserByID(username)
     .then(({user}) => {
       const newUser = {...user}
       this.setState({
         user: newUser
       })
     }) 
  }
 
  handleLogOut = () => {
    const newUser = {}
    this.setState({
      user: newUser
    })
  }
}

export default App;
