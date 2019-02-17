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
import MusicPlayerWidget from './components/MusicPlayer';
import './css/App.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}, // Data for the currently logged in user.
      currentlyPlaying: null, // Data of song currently playing.
    };

    this.audio = new Audio();
  }

  playSong(song) {
    if (!this.state.currentlyPlaying || song.id !== this.state.currentlyPlaying.id) {
      this.setState({
        currentlyPlaying: song,
      }, () => {
        this.audio.src = song.url;
        this.audio.play();
      });
    } else {
      this.audio.play();
    }
  }

  getAudio() {
    return this.audio;
  }

  getCurrentlyPlaying() {
    return this.state.currentlyPlaying;
  }

  authUser(data, callback) {
    localStorage.setItem('auth-token', data.token);
    this.setState({
      user: data.user,
    }, callback);
  }

  getAuthToken() {
    return localStorage.getItem('auth-token');
  }

  getUser() {
    return this.state.user;
  }
  
  render() {
    return (
      <HashRouter>
        <div>
          <Header app={this} />

          <div>
            <Route exact path="/" component={() => <Home isLoggedIn={this.state.isLoggedIn} app={this} />} />
            <Route path="/signup" component={() => <Signup app={this} />} />
            <Route path="/login"  component={() => <Login app={this} />} />
            <Route path="/profile" component={() => <UserProfile isLoggedIn={this.state.isLoggedIn} app={this} />} />
            <Route path="/upload" component={() => <Upload isLoggedIn={this.state.isLoggedIn} app={this} />} />
            <Route path="/home" component={() => <Explore app={this} />} />
          </div>

          {this.getCurrentlyPlaying() && this.state.isLoggedIn &&
            <MusicPlayerWidget app={this} />
          }
        </div>
      </HashRouter>
    );
  }
}

export default App;
