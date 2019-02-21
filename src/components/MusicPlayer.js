import React, { Component } from 'react';
import Image from './Image';
import PlayControlButton from './PlayControlButton';
import helper from '../helpers/functions';
import config from '../config/config';
import '../css/music-player.css';

class MusicPlayer extends Component {
  constructor(props) {
    super(props);

    this.app = props.app;
    this.state = {
      currentLengthStr: '00:00:00',
      audioState: null,
    };
    
    const audio = this.app.getAudio();
    audio.addEventListener('timeupdate', (() => {
      this.setState({
        audioState: 'playing',
        currentLengthStr: helper.time.formatTime(audio.currentTime),
      });
    }).bind(this));
    audio.addEventListener('play', this.onAudioPlaying.bind(this));
    audio.addEventListener('pause', this.onAudioPaused.bind(this));
    audio.addEventListener('ended', this.onAudioEnded.bind(this));
  }

  onAudioPlaying() {
    this.setAudioState('playing');
  }

  onAudioPaused() {
    this.setAudioState('paused');
  }

  onAudioEnded() {
    this.setAudioState('ended');
  }

  setAudioState(state) {
    this.setState({
      audioState: state,
    });
  }

  onPlayControlBtnClicked() {
    const audio = this.app.getAudio();

    if (this.state.audioState != 'playing') {
      audio.play();
    } else {
      audio.pause();
    }
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
            <Image src={`${config.apiEndpointHost}/user/img/${song.User.username}`} className="left" />
            <div className="left">
              <div>{song.title}<span className="track_artist"> &ndash; <a href={`#/${song.User.username}`}>{song.User.name}</a></span></div>
              <div className="track_length">{this.state.currentLengthStr} / {song.lengthStr}</div>
            </div>

            <div className="right controls">
              <a href="#"><i className="fa fa-step-backward"></i></a>
              <PlayControlButton isPlaying={this.state.audioState == 'playing'} onClick={this.onPlayControlBtnClicked.bind(this)} />
              <a href="#"><i className="fa fa-step-forward"></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
