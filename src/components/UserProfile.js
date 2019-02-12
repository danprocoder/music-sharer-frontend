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
        ['Disturbia', '03:48', '3003034', 'Bm'],
        ['Umbrella', '04:23', '3003034', 'Bm'],
        ['Unfaithful', '02:59', '3003034', 'Cm'],
      ],
    };
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
            <SongListItem key={index} trackKey={song[3]} songTitle={song[0]} lengthStr={song[1]} totalViews={song[2]} />
          )}
          </div>

        </div>

      </div>
    );
  }
}

export default UserProfile;
