import React, { Component } from 'react';
import '../css/progress-bar.css';

class ProgressBar extends Component {
  render() {
    return (
      <span className="progressBar">
        <span className="progress" style={{width: `${this.props.percent}%`}}></span>
      </span>
    );
  }
}

export default ProgressBar;
