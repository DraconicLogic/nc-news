import React, { Component } from 'react';
import PostComment from './PostComment'
import * as api from '../Api.js'
import ModVote from './ModVote'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

class Comment extends Component {
    state = {
        comments: []
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.comments.length !== this.props.comments.length) {
            const newComments = this.props.comments
            this.setState({
                comments: newComments
            },() => {
                // this.scrollToBottem()
            })
            
        }

    }

    render() { 
        const { comments } = this.state
        const { user, articleid } = (this.props)      
        return (
        <div>
            <PostComment articleid={articleid} user={user} newComment={this.newComment}/>

            <div id="comments" ref="comments"> 
                <h1>Comments</h1>
                {comments.map((comment, index) => {

                const commenter = comment.created_by.username
                return (
                <div key={index} >

                    <ModVote votes={comment.votes} id={comment._id} url="comments"/>

                    <p>Username: {commenter} - Created at: {dayjs(comment.created_at).format('DD/MM/YYYY')}</p>

                    <p>{comment.body}</p> 

                    {/* render the delete button if the logged in user made the comment */}
                    {(user.username === commenter) && <button  onClick={()=>{this.handlDeleteComment(comment._id)}}>Delete Comment</button>}

                    <hr/>
                </div>
                );
                })}
            </div>  
        </div>
        );
    }     
        
    handlDeleteComment = (id) => {
        const { comments } = this.state
      
        api.deleteComment(id)
        .then(({comment}) => {

            const alteredComments = comments.filter((note) => {
                return note._id !== comment._id
            })

            this.setState({
                comments: alteredComments
            })
        })
    }

    newComment = (newComment) => {
        const alteredComments = [newComment,...this.state.comments]

        this.setState({
            comments: alteredComments
        })
    }

    scrollToBottem = () => {
        // NOT FINISHED
        console.log('SCROLLING FUNCTION')
        this.refs.comments.scrollIntoView()
    }
}

Comment.propTypes = {
    user: PropTypes.object.isRequired
 };
export default Comment;