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
        comments: [],
        visable: false
        
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
        const { comments, visable } = this.state
        const { user, articleid } = (this.props)      
        return (
        <Fragment>
            <PostComment articleid={articleid} user={user} newComment={this.newComment}/>
            <button onClick={this.toggleComments}>Reveal/Hide Comments</button>
            {visable && 
            <section id="comments" ref="comments"> 
                <h1>Comments</h1>
                {comments.map((comment) => {
                const commenter = comment.created_by.username
                return (
                    <article className="comment" key={comment._id} >
                        <ModVote votes={comment.votes} id={comment._id} url="comments"/>
                        <p>Username: {commenter} - Posted: {dayjs().to(dayjs(comment.created_at))}</p>
                        <p>{comment.body}</p> 
                        {(user.username === commenter) && <button onClick={()=>{this.handlDeleteComment(comment._id)}}>Delete Comment</button>}
                        <hr/>
                    </article>
                );
                })}
            </section>}
        </Fragment>
        );
    }     

    toggleComments = () => {
        const { visable } = this.state
        this.setState({
            visable: !visable
        })
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