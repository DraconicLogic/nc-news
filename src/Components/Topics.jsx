import React, { Component } from 'react';
import * as api from '../Api.js'
import {Link} from 'react-router-dom'

class Topics extends Component {
    state = {
        topics: []
    }
    render() {
        return (
            <div>
                <h1>Topics</h1>
            <ul>
                {this.state.topics.map((topic, index) => {
                    console.log(topic)
                    
                    return <Link key={index} to={`/ncnews/topics/${topic.slug}/articles`}><li>{topic.title}</li></Link>
                })}
            </ul>
            </div>
        );
    }
    componentDidMount() {
        api.getTopics()
        .then(({topics}) => {
            this.setState({
                topics: topics
            })
        })
    }
}


export default Topics;