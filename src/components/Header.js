import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/header.css';
import Image from './Image';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.app = props.app;
  }

  onLogoutClicked(event) {
    event.preventDefault();

    this.props.app.logout();
  }

  onSearchClicked(event) {
    event.preventDefault();

    const btn = event.target;
    if (!btn.parentNode.classList.contains('expanded')) {
      btn.parentNode.classList.add('expanded');
    }
  }

  showUserDropdown(event) {
    event.preventDefault();

    event.currentTarget.parentNode.querySelector('.dropDown_content').style.display = 'block';
  }

  render() {
    const user = this.app.getUser();

    return (
      <div className="navbar">
        <div className="container">
            <div className="logo-wrapper">
                <NavLink to="/" className="logo">Music Sharer</NavLink>
                {user && <div className="searchBar_wrapper"><input type="text" placeholder="Search" className="searchBar" /><i className="fa fa-search" onClick={this.onSearchClicked}></i></div>}
            </div>
            {user ? (
              <div className="nav-menus">
                <NavLink to="/upload" className="nav-a link_upload"><i className="fa fa-cloud-upload"></i> Upload</NavLink>
                <NavLink to="/community" className="nav-a">Community</NavLink>

                <span className="dropDown">
                  <a href="#" onClick={this.showUserDropdown} className="nav-a"><i className="fa fa-user-circle-o fa-2x"></i></a>
                  <span className="dropDown_content">
                    <span className="profile_section float-area">
                      <Image src="" className="left" />
                      <span className="left links">
                        <a href="#/profile" className="link_profile">{user.name}</a>
                        <a href="#" className="link_signout" onClick={this.onLogoutClicked.bind(this)}>Sign Out</a>
                      </span>
                    </span>
                  </span>
                </span>

              </div>
            ) : (
              <div className="nav-menus">
                <NavLink to="/community" className="nav-a">Community</NavLink>
                <NavLink to="/login" className="nav-a login-link">Log In</NavLink>
              </div>
            )}
          </div>
      </div>
    );
  }
}

export default Header;
