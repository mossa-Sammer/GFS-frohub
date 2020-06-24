/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { Layout, Icon } from 'antd';

import StylistSider from '../../../components/StylistNavbar';

import './style.css';
import './media.css';

export default class Sider extends Component {
  state = {
    isOpen: false,
  };

  handleMenu = () => {
    this.setState(prevState => {
      const { isOpen } = prevState;
      return {
        isOpen: !isOpen,
      };
    });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <>
        <Layout.Sider className="sider__container">
          <StylistSider />
        </Layout.Sider>
        <div className="mobile__sider-container">
          <div className="left-mobile__sider">
            <img
              src="https://s3-eu-west-2.amazonaws.com/frohub-content/wp-content/uploads/2019/10/22155814/frohub_landscape_e05747ff_transparent_300dpi.png"
              alt="logo"
              className="sider__logo-img"
            />
          </div>
          <div className="right-mobile__sider">
            <Icon
              className="sider__menu-icon"
              type={isOpen ? 'close' : 'menu'}
              onClick={this.handleMenu}
            />
          </div>
        </div>
        {isOpen && (
          <div className="mobile__menu-container" onClick={this.handleMenu}>
            <StylistSider />
          </div>
        )}
      </>
    );
  }
}
