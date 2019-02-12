import React, { Component } from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import Upload from './components/Upload';
import Explore from './components/Explore';
import MusicPlayer from './components/MusicPlayer';
import './css/App.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      currentlyPlaying: null, // Data of song currently playing.
    };
  }

  playSong(song) {
    this.setState({
      currentlyPlaying: song,
    });
  }

  getCurrentlyPlaying() {
    return this.state.currentlyPlaying;
  }
  
  render() {
    return (
      <HashRouter>
        <div>
          <Header isLoggedIn={this.state.isLoggedIn} />

          <div>
                  <Route exact path="/" component={() => <Home isLoggedIn={this.state.isLoggedIn} app={this} />} />
                  <Route path="/signup" component={() => <Signup app={this} />} />
                  <Route path="/login"  component={() => <Login app={this} />} />
                  <Route path="/profile" component={() => <UserProfile isLoggedIn={this.state.isLoggedIn} app={this} />} />
                  <Route path="/upload" component={() => <Upload isLoggedIn={this.state.isLoggedIn} />} />
                  <Route path="/home" component={() => <Explore isLoggedIn={this.state.isLoggedIn} app={this} />} />
          </div>

          {this.getCurrentlyPlaying() && this.state.isLoggedIn &&
            <MusicPlayer app={this} />
          }
        </div>
      </HashRouter>
    );
  }
}

export default App;
