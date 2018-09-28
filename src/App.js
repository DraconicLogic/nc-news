import React, { Component } from 'react';
import './App.css';
import Articles from './Components/Articles.jsx'
import {Route} from 'react-router-dom'
import Article from './Components/Article.jsx'
import TopicArticles from './Components/TopicArticles.jsx'
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import Login from './Components/Login'
import * as api from './Api.js'
import Logout from './Components/Logout'
import ErrorPage from './Components/ErrorPage.jsx'
import PostArticle from './Components/PostArticle';

class App extends Component {
  state = {
    user: {}
  }



  render() {
    const { user } = this.state
    return (
      <div id="App">
        <NavBar user={user} logout={this.handleLogOut}/>

        <div id='app-content'>

        <Route exact path="/" component={Home} />

        <Route exact path="/articles" component={Articles} />

        <Route path="/new-article" render={(routerProps) => <PostArticle user={user} {...routerProps}/>}/>

        <Route exact path="/login" render={(params) => <Login login={this.handleLogin} user={user} params={params}/>} />

        <Route exact path="/logout" component={Logout}/>


        <Route exact path="/articles/:articleid"
        render={(params) => <Article id={params} user={user} />} />
        <Route exact path="/topics/:topic_slug/articles" component={TopicArticles}/>

        <Route exact path="/error" component={ErrorPage}/>
        </div>
      </div>
    );
  }
  
   handleLogin = (username) => {
     api.getUserByID(username)
     .then(({user}) => {
       const newUser = {...user}
       this.setState({
         user: newUser
       },() => {

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
