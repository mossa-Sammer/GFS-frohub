/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

import { Form, Input, Radio, Button } from 'antd';

import { getBusinessDetails, postBusinessDetails } from '../api';

import './style.css';
import './media.css';

class BusinessDetails extends Component {
  state = {
    fullName: '',
    accountNumber: '',
    err: false,
    errMsg: '',
    sortCode1: '',
    sortCode2: '',
    sortCode3: '',
    preferredPayMethod: 'none',
  };

  async componentDidMount() {
    const stylistBusiness = await getBusinessDetails();
    const {
      fullName,
      accountNumber,
      sortCode,
      preferredPayMethod,
    } = stylistBusiness;
    const stylistSortCode = sortCode.split('');
    this.setState({
      fullName,
      accountNumber,
      sortCode1: stylistSortCode[0],
      sortCode2: stylistSortCode[1],
      sortCode3: stylistSortCode[2],
      preferredPayMethod,
    });
  }

  handleSortCode = (num, { target: { value, name } }) => {
    this.setState({ [name]: value, err: false, errMsg: '' });
  };

  handlePaymetMethod = method =>
    this.setState({
      preferredPayMethod: method.target.value,
      err: false,
      errMsg: '',
    });

  handleBusiness = e => {
    e.preventDefault();
    const { form } = this.props;
    const {
      fullName,
      accountNumber,
      sortCode1,
      sortCode2,
      sortCode3,
      preferredPayMethod,
    } = this.state;
    if (!sortCode1 || !sortCode2 || !sortCode3)
      return this.setState({ err: true, errMsg: 'Sort code required' });
    form.validateFieldsAndScroll(async err => {
      if (!err) {
        const business = {
          fullName,
          accountNumber,
          sortCode: sortCode1 + sortCode2 + sortCode3,
          preferredPayMethod,
        };
        await postBusinessDetails(business);
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
    const {
      err,
      errMsg,
      accountNumber,
      fullName,
      sortCode1,
      sortCode2,
      sortCode3,
      preferredPayMethod,
    } = this.state;
    return (
      <div className="business__details-container">
        {err && <span className="err__msg-box">* {errMsg} !</span>}
        <Form onSubmit={this.handleBusiness}>
          <Form.Item className="business__form-item" label="Your full name">
            {getFieldDecorator('fullName', {
              rules: [
                { required: true, message: 'Please, Enter your full name' },
              ],
              initialValue: fullName,
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
              initialValue: accountNumber,
            })(<Input name="accountNumber" onChange={this.handleValues} />)}
          </Form.Item>
          <Form.Item className="business__form-item" label="Your sort code">
            <Input.Group>
              <Input
                className="sort_code-input"
                name="sortCode1"
                onChange={e => this.handleSortCode(1, e)}
                required
                value={sortCode1}
              />
              <Input
                className="sort_code-input"
                name="sortCode2"
                onChange={e => this.handleSortCode(2, e)}
                value={sortCode2}
              />
              <Input
                className="sort_code-input"
                name="sortCode3"
                onChange={e => this.handleSortCode(3, e)}
                value={sortCode3}
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
              value={preferredPayMethod}
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
