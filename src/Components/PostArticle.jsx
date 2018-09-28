import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../Api.js";

class PostArticle extends Component {
  state = {
    body: "",
    topics: []
  };

  componentDidMount() {
    api.getTopics().then(data => {
      console.log(data);
    });
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Post New Articles Here</h1>
      </div>
    );
  }
}

PostArticle.propTypes = {
  user: PropTypes.object.isRequired
};

export default PostArticle;
