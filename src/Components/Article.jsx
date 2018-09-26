import React, { Component } from 'react';
import * as api from '../Api.js'
import Comment from './Comment.jsx'
import ModVote from './ModVote.jsx'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom' 



class Article extends Component {
    state = {
        article: {},
        comments: [],
        err: null
    }

    componentDidMount() {
        const { articleid } = this.props.id.match.params

        const article = api.getArticleByID(articleid)
        const comments = api.getCommentsByID(articleid)
        
        Promise.all([ article, comments ])
        .then(([ article, {comments}]) => {
            comments.sort((a, b) => {
                return new Date(b.created_at) - new Date (a.created_at)
            })
            this.setState({
                article: article,
                comments: comments
            })
        })
        .catch((err) => {
            //Atempt to catch error
            console.log(err)
        })
    }
   

    render() {
        console.log(this.state.err)
        const { article, comments, err } = this.state
        const { user } = this.props
        if (err) return <Redirect to={
            {
                pathname: "/error",
                state:
                {
                    from:`/ncnews/articles`,
                    err

                }}}/>
        return ( 
            <div>
                <br/>
                <ModVote className="votes" votes={article.votes} id={article._id} url='articles' />
                

                <p>Posted at: {dayjs(article.created_at).format('DD/MM/YYYY')}</p>
                <p >Topic: {article.belongs_to}</p>
                <h1>{article.title}</h1>
                <p>{article.body}</p>                
                <div className="comment-box">
                 <hr/>
                <Comment comments={comments} user={user} articleid={article._id}/>
                </div>
            </div>
        );

    }
   
}

Article.propTypes = {
    user: PropTypes.object.isRequired,

    id: PropTypes.shape({
        match: PropTypes.shape({
            params: PropTypes.shape({
                articleid: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    }).isRequired
};

export default Article;