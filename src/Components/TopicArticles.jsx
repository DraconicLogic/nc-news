import React, { Component } from 'react';
import * as api from '../Api.js'
import {Link} from 'react-router-dom'
import ModVote from './ModVote.jsx'

class TopicArticles extends Component {
    state = {
        articles: [],
        slug: ''
    }

    componentDidMount() {

        const {topic_slug} = this.props.match.params
        api.getArticleByTopic(topic_slug)
        .then(({articles}) => {
            this.setState({
                articles: articles,
                slug: topic_slug
            })
        })
    }

    componentDidUpdate (prevProps) {

        const {topic_slug} = this.props.match.params
        if (prevProps.match.params !== this.props.match.params) {
            
            api.getArticleByTopic(topic_slug)
            .then(({articles}) => {
            this.setState({
                articles: articles,
                slug: topic_slug
            })
        })
        }
    }

    render() { 
        console.log(this.props,'TOPIC TITLE HERE???')
        const { articles, slug } = this.state
        return <div className="articles">
            <h1>{slug} Articles</h1>
            {articles.map((newsArticle, index) => {
               
                return (<div className="cards" key={index} >
                <div className="card-title">
                <Link to={`/ncnews/articles/${newsArticle._id}`}><h3 >{newsArticle.title}</h3></Link>
                </div>
                <ModVote className="card-vote" id={newsArticle._id} votes={newsArticle.votes} url="articles"/>

                    <div className="card-body">{newsArticle.body}</div>

                    <Link to={`/ncnews/articles/${newsArticle._id}`}>
                    <p className="card-readmore">Read More...</p></Link>
                </div>
                )
            })}
           <br/> 
        </div>
     
    }


    
    
}

export default TopicArticles;