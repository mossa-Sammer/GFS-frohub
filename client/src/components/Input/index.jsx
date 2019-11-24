import React, { Component } from 'react';
import { Input } from 'antd';

import './index.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class SharedInput extends Component {
  render() {
    return (
      <div>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Input {...this.props} className="input" />
      </div>
    );
  }
}
