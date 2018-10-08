import React, { Component } from 'react';
import * as api from '../Api.js';
import ArticleCard from './ArticleCard';
import { Link } from 'react-router-dom';

class TopicArticles extends Component {
    state = {
        articles: [],
        slug: ''
    }

    componentDidMount() {
        const {topic_slug} = this.props.match.params
        api.getArticleByTopic(topic_slug)
        .then(({articles}) => {
            articles.sort((a, b) => {
                b.created_at - a.created_at
            })
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
        const { articles, slug } = this.state
        return <div className="articles">
            <h1 className="slug">{slug} Articles</h1>
            <Link to={{
                pathname: '/new-article',
                state: {
                    slug,
                }
            }}> <button id="add-article">Post Article</button> </Link>
            {articles.map((newsArticle) => {
               
                return (
                    <ArticleCard article={newsArticle} key={newsArticle._id} />
                )
            })}
        </div>  
    }
}

export default TopicArticles;