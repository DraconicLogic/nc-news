import React, { Component } from 'react';
import * as api from '../Api.js'
import {Link} from 'react-router-dom'

class TopicArticles extends Component {
    state = {
        articles: [],
        slug: ''
    }
    render() {
        return (
            <div>
                <h1>{this.state.slug} Articles</h1>
                <ul>
                {this.state.articles.map((article, index) => {
                    return <Link key={index} to={`/ncnews/articles/${article._id}`}><li>{article.title}</li></Link>
                })}
                </ul>
            </div>
        );
    }

    componentDidMount() {
        const slug = this.props.match.params.topic_slug
        api.getArticleByTopic(slug)
        .then(({articles}) => {
            this.setState({
                articles: articles,
                slug: slug
            })
        })
    }
    
}

export default TopicArticles;