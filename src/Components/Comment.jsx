import React, { Component } from 'react';
import PostComment from './PostComment'
import * as api from '../Api.js'
import ModVote from './ModVote'
import dayjs from 'dayjs'

class Comment extends Component {
    state = {
        comments: []
    }
    render() { const logged = (this.props.user.username)
        return (
            <div>
                <PostComment articleid={this.props.articleid} user={this.props.user} newcoms={this.handleNewComments}/>
                    <div className="comments"> 
                    <h1>Comments</h1>
                   
                    {}
                    {this.state.comments.map((comment, index) => {
                        const username = comment.created_by.username
                    return <div key={index} >
                    <ModVote votes={comment.votes} id={comment._id} url="comments"/>
                            <p>Username: {comment.created_by.username} - Created at: {dayjs(comment.created_at).format('DD/MM/YYYY')}</p>
                            <p>{comment.body}</p> 
                            <button {logged !== username ? 'hidden' : ''}  onClick={()=>{this.handlDeleteComment(comment._id)}}>Delete Comment</button>
                            <hr/>
                        </div>
                    })}
                  </div>  
            </div>
        );
    }
    componentDidMount() {

    }
        componentDidUpdate(prev, current){
           

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