import React, { Component } from 'react';
import * as api from '../Api.js'
import Comment from './Comment.jsx'
import ModVote from './ModVote.jsx'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom' 
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

class Article extends Component {
    state = {
        article: {},
        comments: [],
        err: null
    }

    componentDidMount() {
        const { articleid } = this.props.match.params
        console.log(articleid)
        Promise.all(
            [ 
                api.getArticleByID(articleid),
                api.getCommentsByID(articleid)
            ]
        )
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
            this.setState({
                err
            })
        })
    }
   
    render() {
        const { article, comments, err } = this.state
        const { user } = this.props
        if (err) return <Redirect to={
            {
                pathname: "/error",
                state:
                {
                    from:`/articles`,
                    err

                }}}/>
        return ( 
            <article>
                <header>
                    <h1>{article.title}</h1>
                    <p>Posted : {dayjs().to(dayjs(article.created_at))}</p>
                    <p >Topic: {article.belongs_to}</p>
                </header>
                <ModVote className="votes" votes={article.votes} id={article._id} url='articles' />
                <p>{article.body}</p>                
                <div className="comment-box">
                 <hr/>
                <Comment comments={comments} user={user} articleid={article._id}/>
                </div>
            </article>
        );
    }
}

Article.propTypes = {
    user: PropTypes.object.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                articleid: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
};

export default Article;