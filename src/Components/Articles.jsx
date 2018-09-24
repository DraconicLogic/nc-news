import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as api from '../Api.js'
import ModVote from './ModVote'



class Articles extends Component {
    state = {
        articles: []
    }

    componentDidMount () {

        api.getArticles()
        .then(({articles}) => {
            this.setState({
                articles: articles
            })
        })
    }

    render() { 
        return <div className="articles">
            <h1 id="article-header">Articles</h1>
            {this.state.articles.map((newsArticle, index) => {
               
                return (<div className="cards" key={index} >
                <div className="card-title">
                <Link to={`/ncnews/articles/${newsArticle._id}`}><h3 className='article-title'>{newsArticle.title}</h3></Link>
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
export default Articles;