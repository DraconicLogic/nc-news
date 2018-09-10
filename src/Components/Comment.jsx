import React, { Component } from 'react';
import PostComment from './PostComment'
import * as api from '../Api.js'
import ModVote from './ModVote'

class Comment extends Component {
    state = {
        comments: []
    }
    render() {console.log(this.state)
        return (
            <div>
                <PostComment articleid={this.props.articleid} user={this.props.user} newcoms={this.handleNewComments}/>
                <h1>Comments</h1>
                {console.log(this.state.comments)}
                {this.state.comments.map((comment, index) => {
                return <div key={index}><ModVote votes={comment.votes} id={comment._id}/>
                        <p>Username: {comment.created_by.username} - Created at: {comment.created_at}</p>
                        <p>{comment.body}</p> <button  onClick={()=>{this.handlDeleteComment(comment._id)}}>Delete Comment</button>
                        <hr/>
                    </div>
                })}
            </div>
        );
    }
    componentDidMount() {

        // const newComments = this.props.comments
        // console.log(this.props.comments)
        // this.setState({
        //     comments: newComments
        // })
        
        // api.getCommentByID(id)
        // .then((newComments) => {
            //     console.log(newComments)
            // })
        }
        componentDidUpdate(prev, current, other){
            console.log(prev, 'PREVIOUS PROPS')
            console.log(current,'CURRENT STATE')
            console.log(this.props, 'CURRENT PROPS')
            console.log(this.state,'STATE NOW')

            if (prev.comments.length !== this.props.comments.length) {
                const newComments = this.props.comments
                this.setState({
                    comments: newComments
                })
            }

        }
        
        
    handlDeleteComment = (id) => {
        console.log(id)
        api.deleteComment(id)
        .then(({comment}) => {
            console.log(comment,'DELETED COMMENT')
            const copyComments = [...this.state.comments]
            const modComments = copyComments.filter((coms) => {
                return coms._id !== comment._id
            })
            console.log(modComments,' MODIFIED COMMENTS')
            this.setState({
                comments: modComments
            })
        })
    }

    handleNewComments = (newComment) => {
        console.log(newComment,'COMMENT PASSED BACK TO COMMENT COMPONENT')
        const copyComments = [...this.state.comments]
        const modComments = [...copyComments, newComment]

        this.setState({
            comments: modComments
        })
    }

    handleChanges = (newComment) => {
        console.log(newComment)

        const alteredComments = this.state.comments
        alteredComments.push(newComment)
    
        this.setState({
            comments: alteredComments
        })
    }
}

export default Comment;