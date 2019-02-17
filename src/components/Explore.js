import React, { Component } from 'react';
import SongListItem from './SongListItem';
import API from '../helpers/api';

class Explore extends Component {
  constructor(props) {
    super(props);

    if (!props.app.getUser()) {
      window.location = '#/';
    }

    this.state = {
      trackList: [],
    }
  }

  componentDidMount() {
    (new API('/tracks'))
      .success((data) => {
        this.setState({
          trackList: data
        });
      })
      .error((err) => {
        console.log(err);
      })
      .get();
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div className="pageContent">
        <div className="container">
          {this.state.trackList.map((song, index) => 
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
