import React, { Component } from 'react';
import * as api from '../Api.js'
import ArticleCard from './ArticleCard'

class Articles extends Component {
    state = {
        articles: []
    }

    componentDidMount () {
        api.getArticles()
        .then(({articles}) => {
            this.setState({
                articles
            })
        })
    }

    render() {
        const { articles } = this.state

        return <div className="articles">
            <h1 id="article-header">Articles</h1>
            {articles.map((newsArticle) => {
                return (
                    <ArticleCard article={newsArticle} key={newsArticle._id} />
                )
            })}
        </div>  
    }
}
export default Articles;