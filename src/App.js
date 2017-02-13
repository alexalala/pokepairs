import React, { Component } from 'react';
import GameArea from './components/GameArea';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<h1>Pokepairs</h1>
        <GameArea className="App-GameArea" />
      </div>
    );
  }
}

export default App;
