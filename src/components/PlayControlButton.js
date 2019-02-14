import React, { Component } from 'react';

class PlayControlButton extends Component {
  onClick(event) {
    event.preventDefault();
    
    this.props.onClick();
  }

  render() {
    return (
      <a href="#" className={this.props.className} onClick={this.onClick.bind(this)}>
        {this.props.isPlaying ? (
          <i className="fa fa-pause"></i>
        ) : (
          <i className="fa fa-play"></i>
        )}
      </a>
    );
  }
}

export default PlayControlButton;
