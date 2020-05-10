import React, { Component } from 'react';

import { Form, Input, Radio, Button } from 'antd';

import './style.css';
import './media.css';

class BusinessDetails extends Component {
  state = {
    fullName: '',
    err: false,
    errMsg: '',
    sortCode1: '',
    sortCode2: '',
    sortCode3: '',
    paymentMethod: 'none',
  };

  handleSortCode = (num, { target: { value, name } }) => {
    this.setState({ [name]: value, err: false, errMsg: '' });
  };

  handlePaymetMethod = method =>
    this.setState({
      paymentMethod: method.target.value,
      err: false,
      errMsg: '',
    });

  handleBusiness = e => {
    e.preventDefault();
    const { form } = this.props;
    const {
      fullName,
      sortCode1,
      sortCode2,
      sortCode3,
      paymentMethod,
    } = this.state;
    if (!sortCode1 || !sortCode2 || !sortCode3)
      return this.setState({ err: true, errMsg: 'Sort code required' });
    form.validateFieldsAndScroll(err => {
      if (!err) {
        console.log(fullName, sortCode1, sortCode2, sortCode3, paymentMethod);
        // this.setState({});
      }
    });
  };

  handleValues = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { err, errMsg } = this.state;
    return (
      <div className="business__details-container">
        {err && <span>{errMsg}</span>}
        <Form onSubmit={this.handleBusiness}>
          <Form.Item className="business__form-item" label="Your full name">
            {getFieldDecorator('fullName', {
              rules: [
                { required: true, message: 'Please, Enter your full name' },
              ],
            })(<Input name="fullName" onChange={this.handleValues} />)}
          </Form.Item>
          <Form.Item
            className="business__form-item"
            label="Your account number"
          >
            {getFieldDecorator('accountNumber', {
              rules: [
                {
                  required: true,
                  message: 'Please, Enter your account number',
                },
              ],
            })(<Input name="accountNumber" onChange={this.handleValues} />)}
          </Form.Item>
          <Form.Item
            className="business__form-item"
            label="Your account number"
          >
            <Input.Group>
              <Input
                className="sort_code-input"
                name="sortCode1"
                onChange={e => this.handleSortCode(1, e)}
                required
              />
              <Input
                className="sort_code-input"
                name="sortCode2"
                onChange={e => this.handleSortCode(2, e)}
              />
              <Input
                className="sort_code-input"
                name="sortCode3"
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
          <Button className="business__next-btn" htmlType="submit">
            Next
          </Button>
        </Form>
      </div>
    );
  }
}

const BusinessDetailsForm = Form.create({ name: 'BusinessDetails' })(
  BusinessDetails
);

export default BusinessDetailsForm;
