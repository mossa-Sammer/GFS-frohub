import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import {
  ADMIN_URL,
  ADMIN_PARTNERS_URLS,
  ADMIN_SERVICES_URLS,
} from '../../../routes_urls';

class Sider extends Component {
  handleWelcome = () => {
    const { history } = this.props;
    history.push(ADMIN_URL);
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
          <Link to={ADMIN_URL}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item className="sider-item">
          <Link to={ADMIN_SERVICES_URLS}>Services</Link>
        </Menu.Item>
        <Menu.Item className="sider-item">
          <Link to={ADMIN_PARTNERS_URLS}>Users</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Sider);
