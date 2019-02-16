import React, { Component } from 'react';
import '../css/image.css';

class Image extends Component {
  constructor(props) {
    super(props);

    this.onImageLoad = this.onImageLoad.bind(this);
  }

  onImageLoad() {
    this.image.style.display = 'block';
  }

  render() {
    let className = 'image';
    if (this.props.className) {
      className += ' '.concat(this.props.className);
    }

    return (
      <div className={className}>
        <img src={this.props.src} alt={this.props.src} onLoad={this.onImageLoad} ref={(ref) => this.image = ref} />
      </div>
    );
  }
}

export default Image;
