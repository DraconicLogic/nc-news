import React, { Component } from 'react';
import * as api from '../Api.js'
import {Link} from 'react-router-dom'

class Topics extends Component {
    state = {
        topics: []
    }
    render() { console.log(this.state)
        return (
            <div className="topics">
                <h1>Topics</h1>
            <ul>
                {this.state.topics.map((topic, index) => {

                    
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