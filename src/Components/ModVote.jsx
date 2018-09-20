import React, { Component } from 'react';
import * as api from '../Api.js'

class ModVote extends Component {
    state = {
        voteChange: 0
    }
    render() {
        const { voteChange } = this.state
        const { votes } = this.props
        return (
        <div className="mode-vote">

            <button className={voteChange > 0 ? "upvote" : "neutral"} 
            onClick={() => this.vote('up')}>
                &#8679;
            </button>

            {votes + voteChange}

            <button className={voteChange < 0 ? "downvote" : "neutral"}
            onClick={() => this.vote('down')}>
                &#8681;
            </button>
        </div>
        );
    }
    vote = (direction) => {
        const { voteChange } = this.state

        let confirmed = direction
        let double = false
        switch (direction) {
            case 'up': 
                //if already up voted make request for downvote
                if (voteChange > 0) confirmed = 'down';
                // if already downvoted make 2 requests for upvote
                if (voteChange < 0) double = true;
                break;
            case 'down':
                //if already down voted make request for upvote
                if (voteChange < 0) confirmed = 'up';

                //if already upvoted make 2 requests for downvote
                if (voteChange > 0) double = true;
                break;
        default: break
        }

        this.handleState(confirmed, double)
    
        const id = this.props.id
        const url = this.props.url

        //THIS VARIABLE MAKES A CALL TO API. DONT NEED THIS
        // const apiCall = api.castVote(id, confirmed, url)
        
         if (double === true) {
            Promise.all(
                [
                    api.castVote(id, confirmed, url),
                    api.castVote(id, confirmed, url)
                ]
            )
         } else {
             api.castVote(id, confirmed, url)
         }   
    }

    handleState = (direction, double) => {
        let initial = this.state.voteChange
        let vote;
        if (direction === 'up') !!double ? vote = initial + 2 : vote = initial + 1
        if (direction === 'down') !!double ? vote = initial - 2 : vote = initial -1 

        this.setState({
            voteChange: vote
        })
    }

}

export default ModVote;