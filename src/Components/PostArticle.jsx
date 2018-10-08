import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../Api.js";
import { Redirect } from 'react-router-dom';

class PostArticle extends Component {
  state = {
    title: "",
    body: "",
    newArticle: {}
  };

  render() {
    const { newArticle } = this.state
    const { user } = this.props;
    const { slug } = this.props.location.state;
    if (!!newArticle._id) return <Redirect to={`/topics/${slug}/articles`}/>
    return (
      <div id="post-article">
        <div className="top">
          <h1 >New {slug} article</h1>
          {!user._id ? <p className="login-msg" >Please log in to post an article</p> : null}
          <input type='text' onChange={this.handleTitle} placeholder="Title"/>
        </div>
        <textarea className="middle" onChange={this.handleBody} name="article" id="article-post" cols="100" rows="40" placeholder="Write your article here"/>
        <div className="bottom">
          <button  onClick={this.handleSubmit}>Submit Article</button>
        </div>
      </div> 
    );
  }

  handleSubmit = () => {
    const { user } = this.props;
    const { slug } = this.props.location.state;
    if (!!user._id) {
      const { title, body } = this.state
      const newArticle = {
        title,
        body,
        created_by: user._id,
        belongs_to: slug
      }
      api.postArticle(newArticle)
      .then((postedArticle) => {
        this.setState({
          newArticle: postedArticle
        })
      })
    }
  }

  handleTitle = (event) => {
    this.setState({
      title: event.target.value
    })
  };

  handleBody = (event) => {
    this.setState({
      body: event.target.value
    })
  };

}

PostArticle.propTypes = {
  user: PropTypes.object.isRequired
};

export default PostArticle;
