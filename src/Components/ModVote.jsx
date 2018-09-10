import React, { Component } from 'react';
import * as api from '../Api.js'

class ModVote extends Component {
    state = {
        voteChange: 0
    }
    render() {
        return (
            <div className="mode-vote">
            <button onClick={() => this.vote('up')}>&#8679;</button>
            <button onClick={() => this.vote('down')}>&#8681;</button>
            <p>Votes: {this.props.votes + this.state.voteChange}</p>

        </div>
        );
    }
     vote = (direction) => {
         let confirmed;
         let double = false
        switch (direction) {
            case 'up': 
                if (this.voteChange > 0) confirmed = 'down';
                if (this.voteChange < 0) double = true;
                break;
            case 'down':
            if (this.voteChange < 0) confirmed = 'up';
            if (this.voteChange > 0) double = true;
            break;
        default: break

    }
        const id = this.props.id
        const apiCall = api.castVote(id, confirmed)
         if (!!double) {
             Promise.all([apiCall,apiCall])
         } else {}
         api.castVote(id, confirmed)
         .then((data)=> {
             console.log(data)
         })

         this.handleState(direction, double)
     }
     

    handleState = (direction, double) => {
        let initial = this.state.voteChange
        let vote;
        if (direction === 'up') vote = initial + 1
        if (direction === 'down') vote = initial - 1

        this.setState({
            votes: vote
        })
    }
    componentDidUpdate() {
        console.log(this.props,'PROPS IN UPDATE')

    }
    componentDidMount() {
        console.log(this.props,'PROPS IN MOUNT')
    }
}

export default ModVote;