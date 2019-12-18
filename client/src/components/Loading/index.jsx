import React, { Component } from 'react';
import { Spin, Icon } from 'antd';

import './style.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading__container">
        <Spin indicator={<Icon className="loading__icon" type="loading" />} />
        <span className="loading__text">Loading</span>
      </div>
    );
  }
}
