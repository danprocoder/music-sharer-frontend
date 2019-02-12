import React, { Component } from 'react';
import SongListItem from './SongListItem';

class Explore extends Component {
  constructor(props) {
    super(props);

    if (!props.isLoggedIn) {
      window.location = '#/';
    }

    this.state = {
      latest: [
        ['Halo of Blood', '04:28', '4508758489', 'G#m', 'Children of Bodom'],
        ['Umbrella', '04:23', '3003034', 'Bm', 'Rihanna'],
        ['Unfaithful', '02:59', '3003034', 'Cm', 'Rihanna'],
      ]
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          {this.state.latest.map((song, index) => 
          <SongListItem key={index} banner="default-banner.png" songTitle={song[0]} lengthStr={song[1]} totalViews={song[2]} trackKey={song[3]} artist={song[4]} />
          )}
        </div>
      </div>
    );
  }
}

export default Explore;
