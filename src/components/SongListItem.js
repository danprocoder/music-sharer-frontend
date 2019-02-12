import React, { Component } from 'react';
import WaveForm from './WaveForm';
import Image from './Image';
import '../css/song-list-item.css';

class SongListItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      waveForms: [],
    }
    for (let i = 0; i < 300; i++) {
      const height = Math.ceil((Math.random() * 40) + 1);
      this.state.waveForms.push([
        height,
        (40/2) - (height/2) // y-coordinate (margin-bottom)
      ]);
    }

    this.onPlayButtonPressed = this.onPlayButtonPressed.bind(this);
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

  onPlayButtonPressed(event) {
    event.preventDefault();

    this.setState({isPlaying: true});
  }

  render() {
    const views = this.formatNumber(this.props.totalViews);

    let classes = 'songListItem';
    if (this.props.banner) {
      classes += ' hasBanner';
    }
    if (this.state.isPlaying) {
      classes += ' isPlaying';
    }

    return (
      <div className={classes}>
        {this.props.banner && <Image src={this.props.banner} />}

        <div>
    <div>{this.props.songTitle}{this.props.artist && <span className="artistName_wrapper"> &mdash; <a href="#/profile" className="artistName">{this.props.artist}</a></span>}</div>
          <div className="waveForm_wrapper">
            {(this.state.isPlaying) ?
            <WaveForm data={this.state.waveForms} /> : null
            }
            <a href="#" onClick={this.onPlayButtonPressed} className="btn_play"><i className="fa fa-play"></i></a>
          </div>
          <div className="bottom float-area">
            <div className="left">
              <span className="song-length">{this.state.isPlaying ? '00:00 / ' : null}{this.props.lengthStr}</span>
              <span><i className="fa fa-key"></i> {this.props.trackKey}</span>
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
