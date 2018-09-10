import React, { Component } from 'react';
import * as api from '../Api.js'

class PostComment extends Component {
    state = {
        user: {},
        body:''
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
               <input placeholder="Make a comment" onChange={this.handleText} type="text" name="comment" id="comment-box"/> 
               <input type="button" onClick={this.handleSubmit} value="Submit"/><br/>
               {!!this.state.user._id ? <p></p> : <p className="login-msg">Please login to make comment</p>}
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
        if (!!this.state.user._id) {
            const comment = 
            {
                body: this.state.body,
                belongs_to: this.props.articleid,
                created_by: this.state.user._id
            }
            event.preventDefault()
        
            api.postComment(comment)
            .then(({comment}) => {
                this.props.newcoms(comment)
                this.setState({
                    body: ''
                })
            })
        }
    }
    componentDidMount () {
        console.log(this.props.user.username)
        
        if (!!this.props.user.username) {
            const newUser = this.props.user
            this.setState({
                user: newUser
            })
        }

    }
}

export default PostComment;