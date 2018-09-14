import React, { Component } from 'react';
import * as api from '../Api.js'

class ModVote extends Component {
    state = {
        voteChange: 0
    }
    render() {
        return (
            <div className="mode-vote">

            <button className={this.state.voteChange > 0 ? "upvote" : "neutral"} onClick={() => this.vote('up')}>&#8679;</button>
            {this.props.votes + this.state.voteChange}
            <button className={this.state.voteChange < 0 ? "downvote" : "neutral"} onClick={() => this.vote('down')}>&#8681;</button>
        </div>
        );
    }
     vote = (direction) => {

        let confirmed = direction
        let double = false
        switch (direction) {
            case 'up': 
                //if already up voted make request for downvote
                if (this.state.voteChange > 0) confirmed = 'down';

                // if already downvoted make 2 requests for upvote
                if (this.state.voteChange < 0) double = true;
                break;
            case 'down':
                //if already down voted make request for upvote
                if (this.state.voteChange < 0) confirmed = 'up';

                //if already upvoted make 2 requests for downvote
                if (this.state.voteChange > 0) double = true;
                break;
        default: break
        }
      console.log(confirmed,'CONFIRMED DIRECTION')
      console.log(this.state.voteChange, 'VOTE CHANGE STATE')
      console.log(double,'DOUBLE?')
        const id = this.props.id
        const url = this.props.url

        const apiCall = api.castVote(id, confirmed, url)
        
         if (!!double) {
             Promise.all([apiCall,apiCall])
             .then(()=>{
                 this.handleState(confirmed, true)
             })

         } else {
             api.castVote(id, confirmed, url)
         .then(()=> {
             this.handleState(confirmed, false)
         })
         }   
     }

    handleState = (direction, double) => {
        let initial = this.state.voteChange
        let vote;
        if (direction === 'up') !!double ? vote = initial + 2 : vote = initial + 1
        if (direction === 'down') !!double ? vote = initial - 2 : vote = initial -1 
        console.log(vote,' HANDLE STATE')
        this.setState({
            voteChange: vote
        })
    }
    componentDidUpdate() {


    }
    componentDidMount() {
     
    }
}

export default ModVote;