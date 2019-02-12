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
    return (
      <div className="image">
        <img src={this.props.src} alt={this.props.src} onLoad={this.onImageLoad} ref={(ref) => this.image = ref} />
      </div>
    );
  }
}

export default Image;
