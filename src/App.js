import React, { Component } from 'react';
import MusicPlayer from './components/musicPlayer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MusicPlayer />
      </div>
    );
  }
}

export default App;
