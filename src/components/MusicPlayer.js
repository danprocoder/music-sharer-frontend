import React, { Component } from 'react';
import Image from './Image';
import '../css/music-player.css';

class MusicPlayer extends Component {
  constructor(props) {
    super(props);

    this.app = props.app;
  }

  render() {
    const song = this.app.getCurrentlyPlaying();
    if (!song) {
      return;
    }

    return (
      <div className="musicPlayer">
        <div className="musicPlayer_small">
          <div className="container float-area">
            <Image src={song.banner} className="left" />
            <div className="left">
              <div>{song.title}<span className="track_artist"> &ndash; <a href="#/profile">{song.artist}</a></span></div>
              <div className="track_length">00:00 / {song.lengthStr}</div>
            </div>

            <div className="right controls">
              <a href="#"><i className="fa fa-step-backward"></i></a>
              <a href="#"><i className="fa fa-pause"></i></a>
              <a href="#"><i className="fa fa-step-forward"></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
