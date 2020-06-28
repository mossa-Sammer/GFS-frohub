import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import axios from '../../axios-config';

import {
  STYLIST_URL,
  PERSONAL_URL,
  BUSINESS_URL,
  SALON_URL,
  STYLIST_SERVICES_URL,
  LOGIN_URL,
} from '../../routes_urls';

class Sider extends Component {
  handleWelcome = () => {
    const { history } = this.props;
    history.push(STYLIST_URL);
  };

  handleLogout = async () => {
    await axios.get('/logout');
    localStorage.removeItem('user');
    window.open(LOGIN_URL, '_self');
  };

  render() {
    return (
      <Menu className="sidebar-menu">
        <Menu.Item className="logo-box" onClick={this.handleWelcome}>
          <img
            src="https://s3-eu-west-2.amazonaws.com/frohub-content/wp-content/uploads/2019/10/22155814/frohub_landscape_e05747ff_transparent_300dpi.png"
            alt="logo"
            className="logo-img"
          />
        </Menu.Item>
        <Menu.Item className="sider-item">
          <Link to={PERSONAL_URL}>Personal</Link>
        </Menu.Item>
        <Menu.Item className="sider-item">
          <Link to={BUSINESS_URL}>Business</Link>
        </Menu.Item>
        <Menu.Item className="sider-item">
          <Link to={SALON_URL}>Salon</Link>
        </Menu.Item>
        <Menu.Item className="sider-item">
          <Link to={STYLIST_SERVICES_URL}>Services</Link>
        </Menu.Item>
        <Menu.Item className="sider-item" onClick={this.handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Sider);
