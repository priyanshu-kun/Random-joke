import React, { Component } from "react";
import "./styles.css";
import "./jokeList.css";
import axios from "axios";
// import { FaLaugh } from "react-icons/fa";
import Joke from "./joke";
import { v4 as uuidv4 } from "uuid";
const BASE_URI = "https://icanhazdadjoke.com/";

class JokeList extends Component {
  static defaultProps = {
    minimumJokes: 10
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(localStorage.getItem("jokes") || "[]"),
      loading: false
    };
    // this.getJokes = this.getJokes.bind(this);
    this.seenjokes = new Set(this.state.jokes.map((jok) => jok.text));
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  async getJokes() {
    let newJokes = [];

    while (newJokes.length < this.props.minimumJokes) {
      console.log(newJokes.length);
      const response = await axios.get(BASE_URI, {
        headers: {
          Accept: "application/json"
        }
      });
      console.log(response.data);
      if (!this.seenjokes.has(response.data.joke)) {
        newJokes.push({
          text: response.data.joke,
          votes: 0,
          id: uuidv4()
        });
      }
    }
    this.setState({ jokes: newJokes, loading: false });
    localStorage.setItem("jokes", JSON.stringify(newJokes));
  }

  handleClick() {
    // console.log("jokes");
    this.setState({ loading: true }, this.getJokes);
  }

  handleVotes(id, delta) {
    this.setState(
      (st) => ({
        jokes: st.jokes.map((j) => {
          return j.id === id ? { ...j, votes: j.votes + delta } : j;
        })
      }),
      () => localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }

  render() {
    let shortedJokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
    return (
      <div className="jokeList">
        <div className="jokeList-sidebar">
          <h1 className="jokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="emojie"
          />
          <button className="getMore-jokes" onClick={this.handleClick}>
            New Jokes
          </button>
        </div>

        <div className="jokeList-jokes">
          {this.state.loading ? (
            <div className="jokeList-loading">
              <img
                src="https://media1.giphy.com/media/MDrmyLuEV8XFOe7lU6/200w.webp?cid=ecf05e474q7in865t1md3awo12x23vesmvzgkxb0w2mspgsg&rid=200w.webp"
                alt="loader"
              />
            </div>
          ) : (
            shortedJokes.map((j) => {
              return (
                <Joke
                  key={j.id}
                  votes={j.votes}
                  text={j.text}
                  upvote={() => this.handleVotes(j.id, 1)}
                  downvote={() => this.handleVotes(j.id, -1)}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default JokeList;
