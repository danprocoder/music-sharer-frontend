import React, { Component } from 'react';

class WaveForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="waveForm">
        {this.props.data.map((height, index) => 
          <div key={index} style={{
            height: `${height[0]}px`,
            display:'inline-block',
            marginRight: '1px',
            marginBottom: `${height[1]}px`,
            width: '3px',
            background: '#f3f3f3'
          }}></div>
        )}
      </div>
    );
  }
}
export default WaveForm;
