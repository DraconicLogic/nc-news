import React, { Component } from 'react';
import * as api from '../Api.js';
import ArticleCard from './ArticleCard.jsx';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    state = {
        articles: [],
        err: null
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
        .catch((err) => {
            this.setState({
                err
            })
        })
    }
    
    render() {
        const { articles, err } = this.state
        if (err) return (
            <Redirect to={{
                pathname: "/error",
                state:{
                    from: '/',
                    err
                }
            }}/>)
        return (
            <div id="home">
                <header id="title-div">
                    <div id="title-items">
                        <img className="title-item" id="nc-header"src="https://northcoders.com/images/logos/learn_to_code_manchester_original_second.png" alt="Northcoders header"/>
                        <h1 className="title-item" id='title' >NEWS</h1>
                        <h3>The REAL front page of the internet</h3>
                        <h2>Top 5 articles</h2>
                    </div> 
                </header>
                <div className="articles">
                {articles.map((newsArticle) => {
                   return (
                   <ArticleCard article={newsArticle} key={newsArticle._id}/>
                   )
                })}
                </div>
            </div>
        );
    }
}

export default Home;