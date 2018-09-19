import React, { Component } from 'react';
import * as api from '../Api.js'

class PostComment extends Component {
    state = {
        body:''
    }

    componentDidMount () {


    }
    
    render() {
        console.log(this.props)
        const { user } = this.props
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

               <input placeholder="Make a comment" onChange={this.handleText} type="text" name="comment" id="comment-box"/> 

               <input type="button" onClick={this.handleSubmit} value="Submit"/><br/>

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
        if (!!user._id) {
            const comment = 
            {
                body: this.state.body,
                belongs_to: articleid,
                created_by: user._id
            }
            
            api.postComment(comment)
            .then(({comment}) => {
                this.setState({
                    body: ''
                })
                newComment(comment)
            })
        }
    }
    
}

export default PostComment;