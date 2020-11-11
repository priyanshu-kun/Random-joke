import React, { Component } from "react";
import "./styles.css";
import JokeList from "./jokeList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <JokeList />
      </div>
    );
  }
}

export default App;
