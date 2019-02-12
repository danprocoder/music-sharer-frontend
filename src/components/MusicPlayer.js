import React, { Component } from 'react';
import Image from './Image';

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="musicPlayer">
        <div className="musicPlayer_small">
          <div className="container float-area">
            <Image src={null} className="left" />
            <div className="left">
              <div>Disturbia &ndash; Rihanna</div>
              <div>00:00 / 02:48</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
