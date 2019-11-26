import React, { Component } from 'react';
import { Input } from 'antd';

import './index.css';

export default class SharedInput extends Component {
  render() {
    const { type, error } = this.props;
    return (
      <div>
        <>
          {type === 'password' ? (
            <Input.Password {...this.props} className="input" />
          ) : (
            <Input
              {...this.props}
              className={`${error && 'err__border'} input`}
            />
          )}
          {error && <span className="err__text">{error}</span>}
        </>
      </div>
    );
  }
}
