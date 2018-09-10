import React, { Component } from 'react';
import * as api from '../Api.js'
import {Link} from 'react-router-dom'

class Home extends Component {
    state = {
        articles: []
    }
    render() {
        return (
            <div>
                <h1>NC NEWS</h1>
                <h3>More impartial than the BBC</h3>
                <br/>
                <br/>
                <h2>Top 5 articles</h2>
                <ol>
                {this.state.articles.map((article, index) => {
                    if(index < 5) {
                        return (  <Link key={index} to={`/ncnews/articles/${article._id}`}><li>{article.title} - Votes: {article.votes}</li></Link>)
                    }
                    return null
                })}
                </ol>
            </div>
        );
    }
    componentDidMount() {
        api.getArticles()
        .then(({articles}) => {
            articles.sort((a, b) => {
                return (b.votes - a.votes)
            })
            this.setState({
                articles: articles
            })
        })
    }
}

export default Home;