import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import config from '../config/config';
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
        imgUrl: null,
        name: null,
        username: null,
        locationStr: null,
        about: null,
      },
      songs: [],
      bioEditMode: false,
      uploadingProfilePic: false,
    };

    this.app = props.app;

    this.userBioContainer = null;
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

  startEditBio = (event) => {
    if (event) {
      event.preventDefault();
    }

    this.setState({
      bioEditMode: true,
    }, () => {
      this.userBioContainer.focus();
    });
  };

  checkBioKeyPress = (event) => {
    if (event.charCode == 13) {
      event.preventDefault();

      this.saveUserBio();
    }
  };

  saveUserBio = () => {
    const about = this.state.user.about = this.userBioContainer.innerText;

    this.setState({
      bioEditMode: false,
      user: this.state.user,
    });

    new API('/user/bio')
      .setHeaders({
        'Authorization-Token': this.app.getAuthToken(),
      })
      .success((data) => {
        
      })
      .error((error) => {
        
      })
      .patch({
        bio: about,
      });
  };

  uploadProfile = (event) => {
    const photo = event.target.files[0];

    this.setState({
      uploadingProfilePic: true,
    });

    const formData = new FormData();
    formData.append('photo', photo);
    new API('user/photo')
      .setHeaders({
        'Authorization-Token': this.app.getAuthToken(),
      }).success((data) => {
        const user = this.state.user;
        user.imgUrl = `${data.imgUrl}?a=${Math.random()}`;

        this.setState({
          uploadingProfilePic: false,
          user,
        });
      }).error((error) => {
        this.setState({
          uploadingProfilePic: false,
        });
      }).patch(formData);
  }

  getEditPhotoBtn() {
    if (this.state.user.id === this.app.getUser().id) {
      return this.state.uploadingProfilePic ? (
        <div className="uploadingImgAnimation_wrapper">
          <i className="fa fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <div className="uploadImgBtn_wrapper">
          <input type="file" className="userProfileFileInput" accept="image/*" onChange={this.uploadProfile} />
          <a href="#"><i className="fa fa-pencil"></i></a>
        </div>
      );
    } else {
      return null;
    } 
  }

  render() {
    let bioClass = 'user-bio';
    if (this.state.bioEditMode) {
      bioClass += ' editMode';
    }

    return (
      <div className="profileSection pageContent">
        
        <div className="container float-area">

          <div className="leftInfo left">
            <Image src={`${config.apiEndpointHost}/user/img/${this.state.user.imgUrl}`}>{this.getEditPhotoBtn()}</Image>

            <div className="fullname">{this.state.user.name}</div>
            <div className="info">
              <div><i className="fa fa-link"></i> {`${window.location.protocol}//${window.location.host}/${this.state.user.username}`}</div>
              <div><i className="fa fa-map-marker"></i> {this.state.user.locationStr}</div>
            </div>

            <div className="bio">
              <div
                className={bioClass}
                contentEditable={this.state.bioEditMode}
                onKeyPress={this.checkBioKeyPress.bind(this)}
                onBlur={this.saveUserBio}
                ref={(r) => this.userBioContainer = r}>{this.state.user.about}</div>

              {(this.state.user.id === this.app.getUser().id && !this.state.bioEditMode) && (
                <div className="editBioLink_wrapper">
                {this.state.user.about ? (
                  <a href="#" onClick={this.startEditBio}><i className="fa fa-pencil"></i> Edit bio</a>
                ) : (
                  <a href="#" onClick={this.startEditBio}><i className="fa fa-pencil"></i> Write about you</a>
                )}
                </div>
              )}
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
