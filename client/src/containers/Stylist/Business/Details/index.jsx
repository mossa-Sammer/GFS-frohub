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
    const stylistBusiness = await getBusinessDetails();
    const {
      accountNumber,
      sortCode,
      preferredPayMethod,
      hasBusiness,
    } = stylistBusiness;
    this.setState({
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
    } = this.state;
    form.validateFieldsAndScroll(async err => {
      if (!err) {
        const business = {
          accountNumber,
          sortCode,
          preferredPayMethod,
        };
        if (!hasBusiness) {
          const { error } = await postBusinessDetails(business);
          if (error)
            return this.setState({ err: true, errMsg: error.error.message });
          this.setState({
            success: true,
            successMessage: 'Successfully Added',
          });
        } else {
          const { error } = await updateBusinessDetails(business);
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
              />
            )}
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

export default withRouter(BusinessDetailsForm);
