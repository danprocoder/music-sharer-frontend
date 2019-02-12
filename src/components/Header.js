import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/header.css';

class Header extends React.Component {

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
                <a href="#"><i className="fa fa-user-circle-o fa-2x"></i></a>
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
