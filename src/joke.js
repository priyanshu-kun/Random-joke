import React, { Component } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./joke.css";

class Joke extends Component {
  getEmojiColor() {
    if (this.props.votes >= 15) {
      return {
        color: "#4caf50",
        emoji: "em em-rolling_on_the_floor_laughing"
      };
    } else if (this.props.votes >= 12) {
      return {
        color: "#8bc34a",
        emoji: "em em-laughing"
      };
    } else if (this.props.votes >= 9) {
      return {
        color: "#cddc39",
        emoji: "em em-smiley"
      };
    } else if (this.props.votes >= 6) {
      return {
        color: "#ffeb3b",
        emoji: "em em-slightly_smiling_face"
      };
    } else if (this.props.votes >= 3) {
      return {
        color: "#ffc107",
        emoji: "em em-neutral_face"
      };
    } else if (this.props.votes >= 0) {
      return {
        color: "#ff9800",
        emoji: "em em-confused"
      };
    } else {
      return {
        color: "#f44336",
        emoji: "em em-angry"
      };
    }
  }
  render() {
    return (
      <div className="Joke">
        <div className="joke-buttons">
          <FaArrowUp className="arrow up" onClick={this.props.upvote} />
          <span
            className="joke-votes"
            style={{ borderColor: `${this.getEmojiColor().color}` }}
          >
            {this.props.votes}
          </span>
          <FaArrowDown className="arrow down" onClick={this.props.downvote} />
        </div>
        <div className="joke-text">{this.props.text}</div>
        <div className="joke-smiley">
          <i
            class={`${this.getEmojiColor().emoji}`}
            // aria-role
            aria-label="ROLLING ON THE FLOOR LAUGHING"
          ></i>
        </div>
      </div>
    );
  }
}

export default Joke;
