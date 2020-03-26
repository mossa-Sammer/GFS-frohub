import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import { PERSONAL_URL } from '../../../routes_urls';

export default class Sider extends Component {
  render() {
    return (
      <Menu>
        <Menu.Item>
          <Link to={PERSONAL_URL}>Personal</Link>
        </Menu.Item>
      </Menu>
    );
  }
}
