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
        {banner: 'https://i.pinimg.com/474x/39/96/3c/39963c6f565f73162bfedae02dbdf789--music-artists-rihanna.jpg', artist: 'Children of Bodom', title: 'Halo of Blood', lengthStr: '04:28', views: '4508758489', key: 'Am', id: '12098987666554601'},
        {banner: 'https://i.pinimg.com/474x/39/96/3c/39963c6f565f73162bfedae02dbdf789--music-artists-rihanna.jpg', artist: 'Rihanna', title: 'Umbrella', lengthStr: '04:23', views: '3003034', key: 'Bm', id: '12098987666554602'},
        {banner: 'https://i.pinimg.com/474x/39/96/3c/39963c6f565f73162bfedae02dbdf789--music-artists-rihanna.jpg', artist: 'Rihanna', title: 'Unfaithful', lengthStr: '02:59', views: '3003034', key: 'Cm', id: '12098987666554603'},
      ]
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          {this.state.latest.map((song, index) => 
          <SongListItem
            key={index}
            app={this.props.app}
            song={song} />
          )}
        </div>
      </div>
    );
  }
}

export default Explore;
