import React, { Component } from 'react';

import { Form, Input, Radio } from 'antd';

import './style.css';
import './media.css';

export default class BusinessDetails extends Component {
  handleSortCode = (num, e) => {
    console.log(e.target.value);
    console.log(num);
  };

  handlePaymetMethod = method => {
    console.log(777, method.target.value);
  };

  render() {
    return (
      <div className="business__details-container">
        <Form>
          <Form.Item
            className="business__form-item"
            label="Your full name"
            name="fullname"
            rules={[{ required: true, message: 'Please input your fullname!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="business__form-item"
            label="Your account number"
            name="accountnumber"
            rules={[
              { required: true, message: 'Please input your account number!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="business__form-item"
            label="Your account number"
            name="sortcode"
            rules={[
              { required: true, message: 'Please input your sort code!' },
            ]}
          >
            <Input.Group>
              <Input
                className="sort_code-input"
                onChange={e => this.handleSortCode(1, e)}
              />
              <Input
                className="sort_code-input"
                onChange={e => this.handleSortCode(2, e)}
              />
              <Input
                className="sort_code-input"
                onChange={e => this.handleSortCode(3, e)}
              />
            </Input.Group>
          </Form.Item>
          <Form.Item className="business__form-item">
            <p className="business-hint">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim
              ad minim veniam
            </p>
          </Form.Item>
          <Form.Item className="business__form-item">
            <Radio.Group
              onChange={this.handlePaymetMethod}
              className="payment__methods-box"
            >
              <Radio className="business__radio-btn" value="card">
                Card
              </Radio>
              <Radio className="business__radio-btn" value="cash">
                Cash
              </Radio>
              <Radio className="business__radio-btn" value="none">
                No preference
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
