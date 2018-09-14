import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as api from '../Api.js'
import ModVote from './ModVote'



class Articles extends Component {
    state = {
        articles: []
    }
    render() { console.log(this.props)
        return <div className="articles">
            <h1>Articles</h1>
            {this.state.articles.map((newsArticle, index) => {
               
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
    componentDidMount () {

        api.getArticles()
        .then(({articles}) => {
            this.setState({
                articles: articles
            })
        })
    }
}
export default Articles;