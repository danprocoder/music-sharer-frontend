import React, { Component } from 'react';
import Image from './Image';
import SongListItem from './SongListItem';
import '../css/user-profile.css';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    if (!props.isLoggedIn) {
      window.location = '#/';
    }

    this.state = {
      user: {
        fullname: 'Rihanna',
        username: 'rihanna',
        locationStr: 'California, USA',
        bio: 'My name is Sandra Jones, I am blah blah blah, lorem ipsum dolor amet sit.'
      },
      songs: [
        {banner: 'banner.png', artist: 'Children of Bodom', title: 'Halo of Blood', lengthStr: '04:28', views: '4508758489', key: 'Am', id: '12098987666554601'},
        {banner: 'banner.png', artist: 'Rihanna', title: 'Umbrella', lengthStr: '04:23', views: '3003034', key: 'Bm', id: '12098987666554602'},
        {banner: 'banner.png', artist: 'Rihanna', title: 'Unfaithful', lengthStr: '02:59', views: '3003034', key: 'Cm', id: '12098987666554603'},
      ],
    };

    this.app = props.app;
  }

  render() {
    return (
      <div>
        
        <div className="container float-area">

          <div className="leftInfo left">
            <Image src='user.jpg' />
            <div className="fullname">{this.state.user.fullname}</div>
            <div className="info">
              <div><i className="fa fa-user"></i> {this.state.user.username}</div>
              <div><i className="fa fa-map-marker"></i> {this.state.user.locationStr}</div>
            </div>

            <div className="bio">
              {this.state.user.bio}
            </div>
          </div>

          <div className="left userContent">
          {this.state.songs.map((song, index) =>
            <SongListItem key={index} app={this.app} song={song} hideBanner={true} hideArtist={true} />
          )}
          </div>

        </div>

      </div>
    );
  }
}

export default UserProfile;
