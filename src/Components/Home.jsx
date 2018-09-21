import React, { Component } from 'react';
import * as api from '../Api.js'
import {Link} from 'react-router-dom'
import ModVote from './ModVote'

class Home extends Component {
    state = {
        articles: []
    }
    render() {
        const { articles } = this.state
        return (
            <div id="home">
                <div id="title-div">
                    <img className="title-item" id="nc-header"src="https://northcoders.com/images/logos/learn_to_code_manchester_original_second.png" alt="Northcoders header"/>
                    <h1 className="title-item" id='title' >NEWS</h1>
                </div>
                <h3>More impartial than the BBC</h3>
                
                <h2>Top 5 articles</h2>
                <ol id="top5">
                {articles.map((newsArticle, index) => {
                   
                   return (
                   <div className="cards" key={index} >
                    <div className="card-title">
                        <Link to={`/ncnews/articles/${newsArticle._id}`}><h3 className="article-title">{newsArticle.title}</h3></Link>
                    </div>
                   <ModVote className="card-vote" id={newsArticle._id} votes={newsArticle.votes} url="articles"/>
   
                       <div className="card-body">{newsArticle.body}</div>
   
                       <Link to={`/ncnews/articles/${newsArticle._id}`}>
                       <p className="card-readmore">Read More...</p></Link>
                   </div>
                   )
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
            const topFive = articles.slice(0,5)
            this.setState({
                articles: topFive
            })
        })
    }
}

export default Home;