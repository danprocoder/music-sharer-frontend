import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/header.css';
import Image from './Image';
import config from '../config/config';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.app = props.app;

    this.userPopup = null;
    this.header = null;
    this.searchContainer = null;
  }

  onLogoutClicked(event) {
    event.preventDefault();

    this.props.app.logout();
  }

  clickedOutside(event, element) {
    if (element) {
      return !event.target.isSameNode(element) && !element.contains(event.target);
    } else {
      return true;
    }
  }

  componentDidMount() {
    document.addEventListener('click', ((event) => {
      // Close user popup on click outside
      if (this.userPopup && this.clickedOutside(event, this.userPopup)) {
        this.userPopup.querySelector('.dropDown_content').style.display = 'none';
      }

      // Close search on click outside
      if (this.searchContainer && this.clickedOutside(event, this.searchContainer)) {
        this.searchContainer.classList.remove('expanded');
      }
    }).bind(this));
  }

  onSearchClicked(event) {
    event.preventDefault();

    if (!this.searchContainer.classList.contains('expanded')) {
      this.searchContainer.classList.add('expanded');
    }
  }

  showUserDropdown(event) {
    event.preventDefault();

    this.userPopup.querySelector('.dropDown_content').style.display = 'block';
  }

  render() {
    const user = this.app.getUser();

    return (
      <div className="navbar" ref={(r) => this.header = r}>
        <div className="container">
            <div className="logo-wrapper">
                <NavLink to="/" className="logo">Music Sharer</NavLink>
                {user && (
                  <div className="searchBar_wrapper" ref={(r) => this.searchContainer = r}>
                    <input type="text" placeholder="Search" className="searchBar" />
                    <i className="fa fa-search" onClick={this.onSearchClicked.bind(this)}></i>
                  </div>
                )}
            </div>
            {user ? (
              <div className="nav-menus">
                <NavLink to="/upload" className="nav-a link_upload"><i className="fa fa-cloud-upload"></i> Upload</NavLink>
                <NavLink to="/community" className="nav-a">Community</NavLink>

                <span className="dropDown" ref={(r) => this.userPopup = r}>
                  <a href="#" onClick={this.showUserDropdown.bind(this)} className="nav-a"><i className="fa fa-user-circle-o fa-2x"></i></a>
                  <span className="dropDown_content">
                    <span className="profile_section float-area">
                      <Image src={`${config.apiEndpointHost}/user/img/${user.imgUrl}`} className="left" />
                      <span className="left links">
                        <a href={`#/${this.app.getUser().username}`} className="link_profile">{user.name}</a>
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
