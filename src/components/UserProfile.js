import React, { Component } from 'react';
import Image from './Image';
import SongListItem from './SongListItem';
import API from '../helpers/api';
import '../css/user-profile.css';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    if (!props.app.getUser()) {
      window.location = '#/';
    }
    
    this.state = {
      user: {
        picUrl: null,
        name: null,
        username: null,
        locationStr: null,
        bio: null,
      },
      songs: [],
    };

    this.app = props.app;
  }

  fetchUserData(onFetched) {
    let endpoint = `user/${this.props.match.params.username}`;

    (new API(endpoint))
      .success(onFetched)
      .error((err) => {
        // Failed to load data.
      })
      .get();
  }

  fetchUserTracks(onFetched) {
    (new API(`${this.state.user.username}/tracks`))
      .success(onFetched)
      .error(err => {
        console.error(err);
      })
      .get();
  }

  componentWillMount() {
    new Promise((resolve, reject) => {
      // Fetch user profile data.
      this.fetchUserData((user => {
        this.setState({ user });
        
        if (user.id == this.app.getUser().id) {
          this.app.setState({ user });
        }

        resolve();
      }).bind(this));
    }).then(() => {
      // Get user tracks.
      this.fetchUserTracks((songs => {
        this.setState({ songs });
      }).bind(this));
    });
  }

  render() {
    return (
      <div className="profileSection pageContent">
        
        <div className="container float-area">

          <div className="leftInfo left">
            <Image src={this.state.user.picUrl} />
            <div className="fullname">{this.state.user.name}</div>
            <div className="info">
              <div><i className="fa fa-link"></i> {`${window.location.protocol}//${window.location.host}/${this.state.user.username}`}</div>
              <div><i className="fa fa-map-marker"></i> {this.state.user.locationStr}</div>
            </div>

            <div className="bio">
              {this.state.user.bio}
            </div>
          </div>

          <div className="left userContent">
          {this.state.songs.map((song, index) =>
            <SongListItem
              key={index}
              app={this.app}
              song={song}
              hideBanner={true}
              hideArtist={true} />
          )}
          </div>

        </div>

      </div>
    );
  }
}

export default UserProfile;
