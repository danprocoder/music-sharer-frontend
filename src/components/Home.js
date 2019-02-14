import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    if (props.isLoggedIn) {
      window.location = '#/home';
    }
  }

  render() {
    return (
      <div className="homePageContent">

        <div className="beautiful-background">
            <div className="container">
              <div className="inner">
                <div className="intro-text">Share your song with people worldwide</div>
                <div>
                  <NavLink to="/signup" className="btn dark-shadow">Join Now</NavLink>
                </div>
              </div>
            </div>
        </div>

        <div>
          <div className="container community-section">
            <div className="header">Chat with users in community</div>
            <div className="m-top-10">
                <NavLink to="/signup" className="link">SIGN UP TO JOIN THE COMMUNITY &rarr;</NavLink>
            </div>
            <i className="fa fa-comments-o"></i>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;