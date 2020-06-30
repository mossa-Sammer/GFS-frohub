import React, { Component } from 'react';

import { Form, Input } from 'antd';

export default class Personal extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <p>
          <span style={{ fontWeight: 'bold' }}>Full Name: </span>
          {user.first_name} {user.last_name}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>Email Address: </span>
          {user.email}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>Role: </span>
          {user.role}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>Mobile Phone Number: </span>
          {user.calling_code} {user.phone_number}
        </p>
      </div>
    );
  }
}
