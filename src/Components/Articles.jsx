import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as api from '../Api.js'



class Articles extends Component {
    state = {
        articles: []
    }
    render() {
        return <ul className="articles">
        {console.log(this.state.articles)}
            {this.state.articles.map((newsArticle, index) => {
               
                return (<li key={index} >
                <Link to={`/ncnews/articles/${newsArticle._id}`}>{newsArticle.title}</Link>
                <br/>
                </li>)
            })}
        </ul>
     
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