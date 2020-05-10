import React, { Component } from 'react';

import { Form, Input, Radio, Button } from 'antd';

import { getBusinessDetails } from './api';

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
    paymentMethod: 'none',
  };

  async componentDidMount() {
    const stylistBusiness = await getBusinessDetails();
    console.log(7555, stylistBusiness);
    const {
      fullName,
      accountNumber,
      sortCode,
      paymentmethod,
    } = stylistBusiness;
    const stylistSortCode = sortCode.split('');
    // console.log(111111111111, sortCode1);
    this.setState({
      fullName,
      accountNumber,
      sortCode1: stylistSortCode[0],
      sortCode2: stylistSortCode[1],
      sortCode3: stylistSortCode[2],
      paymentmethod,
    });
  }

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
      accountNumber,
      sortCode1,
      sortCode2,
      sortCode3,
      paymentMethod,
    } = this.state;
    if (!sortCode1 || !sortCode2 || !sortCode3)
      return this.setState({ err: true, errMsg: 'Sort code required' });
    form.validateFieldsAndScroll(err => {
      if (!err) {
        // eslint-disable-next-line no-unused-vars
        const business = {
          fullName,
          accountNumber,
          sortCode: sortCode1 + sortCode2 + sortCode3,
          paymentMethod,
        };
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
      paymentMethod,
    } = this.state;
    return (
      <div className="business__details-container">
        {err && <span>{errMsg}</span>}
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
              value={paymentMethod}
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
