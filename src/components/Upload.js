import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import API from '../helpers/api';
import '../css/upload.css';

class Uploader {
  constructor(component, title, file, index) {
    this.component = component;
    this.title = title;
    this.file = file;
    this.index = index;
  }

  setState(state) {
    const a = this.component.state.uploaded;
    a[this.index][2] = state;
    this.component.setState({
      uploaded: a,
    });
  }

  upload() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('track', this.file);

    const authToken = this.component.app.getAuthToken();

    (new API('track/upload'))
      .setHeaders({
        'Authorization-Token': authToken,
      })
      .success(((data) => {
        this.setState('finished');
      }).bind(this))
      .error((err) => {
        this.setState('failed');
      })
      .post(formData);

    return this;
  }
}

class Upload extends Component {
  constructor(props) {
    super(props);

    if (!props.app.getUser()) {
      window.location = '#/';
    }

    this.state = {
      uploaded: [],
    };

    this.onUpload = this.onUpload.bind(this);

    this.app = props.app;
  }

  onAddSong(event) {
    event.preventDefault();

    document.getElementById('uploadModal').classList.add('show');
  }

  onUpload(event) {
    event.preventDefault();

    const trackName = document.querySelector('#uploadModal input.title');
    const trackFile = document.querySelector('#uploadModal input[type=file]');

    const uploaded = this.state.uploaded;
    uploaded.push([
      trackName.value, 
      0,
      'uploading',
    ]);
    this.setState({ uploaded });

    (new Uploader(this, trackName.value, trackFile.files[0], uploaded.length - 1)).upload();

    // Reset fields.
    trackName.value = '';
    trackFile.value = '';

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

            {this.state.uploaded.length > 0 && /* Only show if at least 1 file has been uploaded. */
            <div className="uploadedList_wrapper">
              <div className="uploadedList_header">Tracks</div>

              <div className="uploadedList">
                {this.state.uploaded.map((song, index) => 
                <div className="listItem float-area" key={index}>
                  <span className="left">{song[0]}</span>
                  <span className="right">
                    {song[2] == 'uploading' ? (
                    <ProgressBar key={index} percent={song[1]} />
                    ) : (
                      song[2] == 'failed' ? (
                        <a href="#" onClick={(e) => { e.preventDefault(); }} class="status retry"><i className="fa fa-refresh"></i> Retry</a>
                      ) : (
                        <span className="status uploaded"><i className="fa fa-check"></i> Uploaded</span>
                      )
                    )}
                  </span>
                </div>
                )}
              </div>
            </div>
            /* End of uploaded track div. */}
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
                <input type="file" className="trackFile" accept="audio/*" />
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
