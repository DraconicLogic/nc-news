import React, { Component } from 'react';
import PostComment from './PostComment'
import * as api from '../Api.js'
import ModVote from './ModVote'
import dayjs from 'dayjs'

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
        console.log(this.props, 'PROPS')
        const { comments } = this.state
        const { username } = (this.props.user)
       
        return (
            <div>
                <PostComment articleid={this.props.articleid} user={username} newcoms={this.handleNewComments}/>
                    <div className="comments"> 
                    <h1>Comments</h1>
                   
                    
                    {comments.map((comment, index) => {

                    const user = comment.created_by.username
                    return <div key={index} >
                    <ModVote votes={comment.votes} id={comment._id} url="comments"/>
                            <p>Username: {username} - Created at: {dayjs(comment.created_at).format('DD/MM/YYYY')}</p>
                            <p>{comment.body}</p> 
                            {(username === user) && <button  onClick={()=>{this.handlDeleteComment(comment._id)}}>Delete Comment</button>}
                            <hr/>
                        </div>
                    })}
                  </div>  
            </div>
        );
    }     
        
    handlDeleteComment = (id) => {
      
        api.deleteComment(id)
        .then(({comment}) => {

            const copyComments = [...this.state.comments]
            const modComments = copyComments.filter((coms) => {
                return coms._id !== comment._id
            })
  
            this.setState({
                comments: modComments
            })
        })
    }

    handleNewComments = (newComment) => {

        const copyComments = [...this.state.comments]
        const modComments = [...copyComments, newComment]

        this.setState({
            comments: modComments
        })
    }

    handleChanges = (newComment) => {


        const alteredComments = this.state.comments
        alteredComments.push(newComment)
    
        this.setState({
            comments: alteredComments
        })
    }
}

export default Comment;