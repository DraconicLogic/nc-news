import React, { Component, Fragment } from 'react';
import PostComment from './PostComment'
import * as api from '../Api.js'
import ModVote from './ModVote'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

class Comment extends Component {
    state = {
        comments: []        
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.comments.length !== this.props.comments.length) {
            const newComments = this.props.comments
            this.setState({
                comments: newComments
            })
        }
    }

    render() { 
        const { comments } = this.state
        console.log(comments)
        const { user, articleid } = (this.props)      
        return (
        <Fragment>
            <h1>Comments</h1>
            <PostComment articleid={articleid} user={user} newComment={this.newComment}/>  
            <section id="comments" ref="comments"> 
                
                {comments.map((comment) => {
                const {username, avatar_url} = comment.created_by
                console.log(avatar_url)
                return (
                    <article className="comment" key={comment._id} >
                        <ModVote votes={comment.votes} id={comment._id} url="comments"/>
                        <img className="avatar"src={avatar_url} alt="user avatar" srcset=""/>
                        <div className="commenter">
                            <p>Username: {username} <br/>Posted: {dayjs().to(dayjs(comment.created_at))}</p>
                        </div>
                        <p className="comment-body">{comment.body}</p> 
                        {(user.username === username) && <button onClick={()=>{this.handlDeleteComment(comment._id)}}>Delete Comment</button>}
                    
                    </article>
                );
                })}
            </section>
        </Fragment>
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

}

Comment.propTypes = {
    user: PropTypes.object.isRequired,

 };
export default Comment;