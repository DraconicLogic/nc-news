import React, { Component } from 'react';
import * as api from '../Api.js'
import PropTypes from 'prop-types'

class PostComment extends Component {
    state = {
        body:''
    }

    render() {
        
        const { user } = this.props
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <textarea ref="textInput" placeholder="Make a comment" onChange={this.handleText} name="comment" id="comment-box"/><br/>
               <input type="button" onClick={this.handleSubmit} value="Submit"/>
               {!!user._id ? null
               : <p className="login-msg">Please login to make comment</p>}
               </form>
            </div>
        );
    }

    handleText = (event) => {
        this.setState({
            body: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { user, articleid, newComment } = this.props
        const { body } = this.state
        if (!!user._id && body.length > 0) {
            const comment = 
            {
                body: body,
                belongs_to: articleid,
                created_by: user._id
            }
            
            api.postComment(comment)
            .then(({comment}) => {
                this.refs.textInput.value = '';
                newComment(comment)
                this.setState({
                    body: ''
                })
            })
        }
    }
    
}

PostComment.propTypes = {
    user: PropTypes.object.isRequired,
    articleid: PropTypes.string,
    newComment: PropTypes.func
 };

export default PostComment;