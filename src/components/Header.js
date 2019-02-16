import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/header.css';
import Image from './Image';

class Header extends React.Component {

  onLogoutClicked(event) {
    event.preventDefault();

    this.props.app.logout();
  }

  render() {
    return (
      <div className="navbar">
        <div className="container">
            <div className="logo-wrapper">
                <NavLink to="/" className="logo">Social Media Platform</NavLink>
                {this.props.isLoggedIn && <div className="searchBar_wrapper"><input type="text" placeholder="Search" className="searchBar" /><i className="fa fa-search"></i></div>}
            </div>
            {this.props.isLoggedIn ? (
              <div className="nav-menus">
                <NavLink to="/upload"><i className="fa fa-cloud-upload"></i> Upload</NavLink>
                <NavLink to="/community">Community</NavLink>
                <a href="#" className="dropDown">
                  <i className="fa fa-user-circle-o fa-2x"></i>
                  <span className="dropDown_content float-area">
                    <span className="profile_section">
                      <Image src="" className="left" />
                      <span className="left links">
                        <a href="#/profile" className="link_profile">Username</a>
                        <a href="#" className="link_signout" onClick={this.onLogoutClicked.bind(this)}>Sign Out</a>
                      </span>
                    </span>
                  </span>
                </a>
              </div>
            ) : (
              <div className="nav-menus">
                <NavLink to="/community">Community</NavLink>
                <NavLink to="/login" className="login-link">Log In</NavLink>
              </div>
            )}
          </div>
      </div>
    );
  }
}

export default Header;
