import React, { Component } from 'react';
// import * as api from '../Api.js'

class TopicsDropdown extends Component {
    state = {
        topicHeaders: []
    }
    render() {
        return (
            <div>
                {console.log(this.state.topicHeaders)}
                
            </div>
        );
    }
    componentDidMount() {
        // api.getTopics()
        // .then(({topics}) => {
        //     console.log(topics)
            
        //     this.setState({
        //         topicHeaders: topics
                
        //     })
        // })
    }
}


export default TopicsDropdown;