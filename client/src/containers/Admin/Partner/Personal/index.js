import React, { Component } from 'react';

import { Form, Input } from 'antd';

export default class Personal extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <Form>
          <Form.Item label="Full Name">
            <Input value={`${user.first_name}  ${user.last_name}`} disabled />
          </Form.Item>
          <Form.Item label="Email Address">
            <Input value={user.email} disabled />
          </Form.Item>
          <Form.Item label="Role">
            <Input value={user.role} disabled />
          </Form.Item>
          <Form.Item label="Mobile Phone Number">
            <Input
              value={`${user.calling_code} ${user.phone_number}`}
              disabled
            />
          </Form.Item>
        </Form>
      </div>
    );
  }
}
