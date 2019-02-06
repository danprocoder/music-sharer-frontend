import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>SMP</div>
        <div>
          <a href="#">Community</a>
          <a href="#">Log In</a>
        </div>
      </div>
    );
  }
}

export default Header;
