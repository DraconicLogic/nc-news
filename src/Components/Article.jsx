import React, { Component } from 'react';
import * as api from '../Api.js'
import Comment from './Comment.jsx'
import ModVote from './ModVote.jsx'
import dayjs from 'dayjs'


class Article extends Component {
    state = {
        article: {},
        comments: []
    }

    render() {console.log(this.props)
        return ( 
            <div>
                <br/>
                <ModVote className="votes" votes={this.state.article.votes} id={this.state.article._id} url='articles' />
                

                <p>Posted at: {dayjs(this.state.article.created_at).format('DD/MM/YYYY')}</p>
                <h1>{this.state.article.title}</h1>
                <p>{this.state.article.body}</p>                
                <div className="comment-box">
                 <hr/>
                <Comment comments={this.state.comments} user={this.props.user} articleid={this.state.article._id}/>
                </div>
            </div>
        );

    }
    componentDidMount() {
        const article_id = this.props.id.match.params.articleid

        const article = api.getArticleByID(article_id)
        const comments = api.getCommentsByID(article_id)
        
        Promise.all([article,comments])
        .then(([{article}, {comments}]) => {
            this.setState({
                article: article,
                comments: comments
            })
        })
        // .then(() => {
        //     const id = this.state.article._id
        //     return 
        // })
        // .then(({comments}) => {
        //     console.log(comments)
        //     this.setState({
        //     comments: comments
        //     })
        // })
    }
}    


export default Article;