import React, { Component } from "react";
import * as api from "../Api.js";
import PropTypes from "prop-types";

class ModVote extends Component {
  state = {
    voteChange: 0
  };

  render() {
    const { voteChange } = this.state;
    const { votes } = this.props;
    return (
      <div className="mode-vote">
        <button
          className={voteChange > 0 ? "upvote" : "neutral"}
          onClick={() => this.vote("up")}
        >
          ⬆
        </button>

        <p className="vote-num">
          <strong>{votes + voteChange}</strong>
        </p>

        <button
          className={voteChange < 0 ? "downvote" : "neutral"}
          onClick={() => this.vote("down")}
        >
          ⬇
        </button>
      </div>
    );
  }
  vote = direction => {
    const { voteChange } = this.state;
    let confirmed = direction;
    let double = false;
    switch (direction) {
      case "up":
        if (voteChange > 0) confirmed = "down";
        if (voteChange < 0) double = true;
        break;
      case "down":
        if (voteChange < 0) confirmed = "up";
        if (voteChange > 0) double = true;
        break;
      default:
        break;
    }
    this.handleState(confirmed, double);
    const { id, url } = this.props;
    if (double === true) {
      Promise.all([
        api.castVote(id, confirmed, url),
        api.castVote(id, confirmed, url)
      ]);
    } else {
      api.castVote(id, confirmed, url);
    }
  };

  handleState = (direction, double) => {
    let initial = this.state.voteChange;
    let vote;
    if (direction === "up")
      !!double ? (vote = initial + 2) : (vote = initial + 1);
    if (direction === "down")
      !!double ? (vote = initial - 2) : (vote = initial - 1);

    this.setState({
      voteChange: vote
    });
  };
}

ModVote.propTypes = {
  id: PropTypes.string,
  votes: PropTypes.number
};

export default ModVote;
