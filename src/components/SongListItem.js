import React, { Component } from 'react';
import WaveForm from './WaveForm';
import Image from './Image';
import '../css/song-list-item.css';
import helper from '../helpers/functions.js';

class SongListItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      waveForms: [],
      currentLengthStr: '00:00:00',
    }
    for (let i = 0; i < 300; i++) {
      const height = Math.ceil((Math.random() * 40) + 1);
      this.state.waveForms.push([
        height,
        (40/2) - (height/2) // y-coordinate (margin-bottom)
      ]);
    }

    this.onPlayButtonPressed = this.onPlayButtonPressed.bind(this);

    this.app = props.app;

    this.audio = this.app.getAudio();
    this.audio.addEventListener('timeupdate', this.onAudioTimeUpdate.bind(this));
  }

  onAudioTimeUpdate() {
    if (this.app.getCurrentlyPlaying().id == this.props.song.id) {
      this.setState({
        currentLengthStr: helper.time.formatTime(this.audio.currentTime),
      });
    }
  }

  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+$)/g, ',');
  }

  formatViews(views) {
    const initial = /^(\d+),?/.exec(views)[1],
          numCommas = /(,)/g.exec(views).length,
          mapping = {
            1: 'K',
            2: 'M',
            3: 'B',
            4: 'T',
          };
    return `${initial}${mapping[numCommas]}`;
  }

  isCurrentlyPlaying() {
    const song = this.props.song;
    const currentlyPlaying = this.app.getCurrentlyPlaying();

    return currentlyPlaying && currentlyPlaying.id == song.id;
  }

  onPlayButtonPressed(event) {
    event.preventDefault();

    this.props.app.playSong(this.props.song);
  }

  render() {
    const song = this.props.song;
    const views = this.formatNumber(song.views);

    let classes = 'songListItem';
    if (!this.props.hideBanner) {
      classes += ' hasBanner';
    }

    if (this.isCurrentlyPlaying()) {
      classes += ' isPlaying';
    }

    return (
      <div className={classes}>
        {!this.props.hideBanner && <Image src={song.banner} />}

        <div>
    <div>{song.title}{!this.props.hideArtist && <span className="artistName_wrapper"> &mdash; <a href="#/profile" className="artistName">{song.artist}</a></span>}</div>
          <div className="waveForm_wrapper">
            {this.isCurrentlyPlaying() ?
            <WaveForm data={this.state.waveForms} /> : null
            }
            <a href="#" onClick={this.onPlayButtonPressed} className="btn_play"><i className="fa fa-play"></i></a>
          </div>
          <div className="bottom float-area">
            <div className="left">
              <span className="song-length">{this.isCurrentlyPlaying() ? `${this.state.currentLengthStr} / ` : null}{song.lengthStr}</span>
              <span><i className="fa fa-key"></i> {song.key}</span>
              <span className="num-views"><i className="fa fa-eye"></i> {this.formatViews(views)}</span>
            </div>
            <div className="right">
              <a href="#"><i className="fa fa-thumbs-up"></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SongListItem;
