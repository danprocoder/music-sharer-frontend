import React, { Component } from 'react';
import {
  Route,
  HashRouter,
  Switch
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
import API from './helpers/api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null, // Data for the currently logged in user.
      currentlyPlaying: null, // Data of song currently playing.
      canRender: false,
    };

    this.audio = new Audio();
  }
  
  componentWillMount() {
    const token = this.getAuthToken();
    if (token) {
      // Get user data from server using token.
      (new API('user'))
        .setHeaders({
          'Authorization-Token': token,
        })
        .success((user) => {
          this.setState({
            user,
            canRender: true,
          });
        })
        .error((err) => {
          this.setState({
            canRender: true,
          });
        })
        .get();
    } else {
      this.setState({
        canRender: true,
      });
    }
  }

  playSong(song) {
    if (!this.state.currentlyPlaying || song.id !== this.state.currentlyPlaying.id) {
      this.setState({
        currentlyPlaying: song,
      }, () => {
        this.audio.src = `http://localhost:3103/stream/${encodeURIComponent(song.url)}`;
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

  logout() {
    localStorage.removeItem('auth-token');
    this.setState({
      user: null,
    });
  }

  getUser() {
    return this.state.user;
  }
  
  render() {
    if (!this.state.canRender) {
      return <div>Loading...</div>;
    }

    return (
      <HashRouter>
        <div>
          <Header app={this} />

          <div>
            <Switch>
              <Route exact path="/" component={() => <Home isLoggedIn={this.state.isLoggedIn} app={this} />} />
              <Route path="/signup" component={() => <Signup app={this} />} />
              <Route path="/login"  component={() => <Login app={this} />} />
              <Route path="/upload" component={() => <Upload isLoggedIn={this.state.isLoggedIn} app={this} />} />
              <Route path="/home" component={() => <Explore app={this} />} />
              <Route path="/:username?" render={(props) => <UserProfile {...props} app={this} />} />
            </Switch>
          </div>

          {this.getCurrentlyPlaying() && this.getUser() &&
            <MusicPlayerWidget app={this} />
          }
        </div>
      </HashRouter>
    );
  }
}

export default App;
