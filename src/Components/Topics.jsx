import React, { Component } from 'react';
import * as api from '../Api.js'
import {Link} from 'react-router-dom'

class Topics extends Component {
    state = {
        topics: [],
        menuVisable: false

    }

    componentDidMount() {
        api.getTopics()
        .then(({topics}) => {
            this.setState({
                topics: topics
            })
        })
    }



    render() { 
        const { topics, menuVisable } = this.state

        return (
            <div>
                <button onClick={this.openDropdown}>Show Topics</button>

                {menuVisable ? <div id="topics" className="topics-hidden">

                    <ul id="topics-list">

                        {topics.map((topic, index) => {
                            return (<Link title={topic.title} key={index} to={`/ncnews/topics/${topic.slug}/articles`}><li className="topic-item">{topic.title}</li></Link>)
                        })}
                    </ul>
                </div> : null}
            </div>
        );
    }

    openDropdown = () => {
        if (this.state.menuVisable === true) {
            this.closeDropdown()
        } else {
            this.setState({
                menuVisable: true
            },() => {document.addEventListener('click', this.closeDropdown)})
        }
    }
    closeDropdown = () => {
        this.setState({
            menuVisable: false
        },() => {document.removeEventListener('click', this.closeDropdown)})
    }
    
}


export default Topics;