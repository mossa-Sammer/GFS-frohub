/* eslint-disable consistent-return, react/no-unused-state */
import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { Form, Input, Radio, Button } from 'antd';

import {
  getBusinessDetails,
  postBusinessDetails,
  updateBusinessDetails,
} from '../api';

import { SALON_URL } from '../../../../routes_urls';

import './style.css';
import './media.css';

class BusinessDetails extends Component {
  state = {
    userId: null,
    accountNumber: '',
    err: false,
    errMsg: '',
    sortCode: '',
    preferredPayMethod: 'none',
    hasBusiness: false,
    success: false,
    successMessage: '',
  };

  async componentDidMount() {
    const user = await JSON.parse(localStorage.getItem('user'));
    const { userId } = user;
    const stylistBusiness = await getBusinessDetails(userId);
    const {
      accountNumber,
      sortCode,
      preferredPayMethod,
      hasBusiness,
    } = stylistBusiness;
    this.setState({
      userId,
      accountNumber,
      sortCode,
      preferredPayMethod,
      hasBusiness,
    });
  }

  handlePaymetMethod = method =>
    this.setState({
      preferredPayMethod: method.target.value,
      err: false,
      errMsg: '',
    });

  handleBusiness = e => {
    e.preventDefault();
    const { form, history } = this.props;
    const {
      accountNumber,
      sortCode,
      preferredPayMethod,
      hasBusiness,
      userId,
    } = this.state;
    form.validateFieldsAndScroll(async err => {
      if (!err) {
        const business = {
          accountNumber,
          sortCode,
          preferredPayMethod,
        };
        if (!hasBusiness) {
          const { error } = await postBusinessDetails(userId, business);
          if (error)
            return this.setState({ err: true, errMsg: error.error.message });
          this.setState({
            success: true,
            successMessage: 'Successfully Added',
          });
        } else {
          const { error } = await updateBusinessDetails(userId, business);
          if (error)
            return this.setState({ err: true, errMsg: error.error.message });
          this.setState({
            success: true,
            successMessage: 'Successfully Updated',
          });
        }
        setTimeout(() => history.push(SALON_URL), 1000);
      }
    });
  };

  handleValues = ({ target: { value, name } }) => {
    this.setState({ [name]: value, err: false, success: false });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {
      err,
      errMsg,
      accountNumber,
      sortCode,
      preferredPayMethod,
      success,
      successMessage,
    } = this.state;
    return (
      <div className="business__details-container">
        {err && <span className="err__msg-box">* {errMsg} !</span>}
        {success && <span className="success__msg-box">{successMessage}</span>}
        <Form onSubmit={this.handleBusiness}>
          <Form.Item
            className="business__form-item"
            label="Your Bank Account Number"
          >
            {getFieldDecorator('accountNumber', {
              rules: [
                {
                  required: true,
                  message: 'Please, Enter your account number',
                },
              ],
              initialValue: accountNumber,
            })(
              <Input
                name="accountNumber"
                onChange={this.handleValues}
                placeholder="Bank Account Number"
              />
            )}
          </Form.Item>
          <Form.Item className="business__form-item" label="Sort Code">
            {getFieldDecorator('sortCode', {
              rules: [
                {
                  required: true,
                  message: 'Please, Enter your sort code',
                },
              ],
              initialValue: sortCode,
            })(
              <Input
                className="sort_code-input"
                name="sortCode"
                onChange={this.handleValues}
                placeholder="Sort Code"
              />
            )}
          </Form.Item>
          <Form.Item className="business__form-item">
            <p className="business-hint">
              This is the bank account that we would transfer any funds to, such
              as deposits etc.
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
            Save and Next
          </Button>
        </Form>
      </div>
    );
  }
}

const BusinessDetailsForm = Form.create({ name: 'BusinessDetails' })(
  BusinessDetails
);

export default withRouter(BusinessDetailsForm);
