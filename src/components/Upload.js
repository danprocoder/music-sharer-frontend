import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import '../css/upload.css';

class Upload extends Component {
  constructor(props) {
    super(props);

    if (!props.isLoggedIn) {
      window.location = '#/';
    }

    this.state = {
      uploaded: [],
    };

    this.onUpload = this.onUpload.bind(this);
  }

  onAddSong(event) {
    event.preventDefault();

    document.getElementById('uploadModal').classList.add('show');
  }

  onUpload(event) {
    event.preventDefault();

    const trackName = document.querySelector('#uploadModal input.title').value;

    const uploaded = this.state.uploaded;
    uploaded.push([trackName, 22.88]);

    this.setState({ uploaded });

    document.getElementById('uploadModal').classList.remove('show');
  }

  onFinish(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="pageContent">
        <div className="container">

          <div className="float-area top">
            <div className="left header">Upload Tracks</div>
            <div className="right buttons">
              {/* <a href="#" onClick={this.onAddSong} className="">Add Song</a> */}
              <a href="#" onClick={this.onFinish} className="btn">Publish</a>
            </div>
          </div>

          <div className="content">
            <div className="upload-first-time">
              <a href="#" onClick={this.onAddSong}>
                <i className="fa fa-cloud-upload"></i><br />
                <span>Click to add song</span>
              </a>
            </div>

            <div className="uploadedList">
              {this.state.uploaded.map((song, index) => 
              <div className="listItem float-area">
                <span className="left">{song[0]}</span>
                <span className="right">
                  <ProgressBar key={index} percent={song[1]} />
                </span>
              </div>
              )}
            </div>
          </div>

        </div>
        
        <div className="modalContainer" id="uploadModal">
          <div className="modal">
            <div className="header float-area">
              <span className="left">Upload Song</span>
              <a href="" className="right">&times;</a>  
            </div>

            <div className="body">
              <div className="field">
                <div className="label">Song Title</div>
                <input type="text" className="title" />
              </div>
            </div>

            <div className="footer float-area">
              <div className="left btn_browse">
                <input type="file" className="trackFile" />
                <a href="#" className="btn">Browse Files</a>
              </div>
              <a href="#" className="btn right" onClick={this.onUpload}>Upload</a>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Upload;
