import React, { Component } from 'react';
import Header from './components/Header.js';
import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }
  
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default App;
