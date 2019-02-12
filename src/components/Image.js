import React, { Component } from 'react';
import '../css/image.css';

class Image extends Component {
  constructor(props) {
    super(props);
  }

  onImageLoad() {
    
  }

  render() {
    return (
      <div className="image">
        <img src={this.props.src} alt={this.props.src} onLoad={this.onImageLoad} />
      </div>
    );
  }
}

export default Image;
