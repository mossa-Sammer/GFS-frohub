/* eslint-disable consistent-return, react/no-unused-state */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { Form, Input, Button } from 'antd';

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
    hasBusiness: false,
    success: false,
    successMessage: '',
  };

  async componentDidMount() {
    const {
      loggedUser: { userId },
    } = this.props;
    const stylistBusiness = await getBusinessDetails(userId);
    const { accountNumber, sortCode, hasBusiness } = stylistBusiness;
    this.setState({
      userId,
      accountNumber,
      sortCode,
      hasBusiness,
    });
  }

  handleBusiness = e => {
    e.preventDefault();
    const { form, history } = this.props;
    const { accountNumber, sortCode, hasBusiness, userId } = this.state;
    form.validateFieldsAndScroll(async err => {
      if (!err) {
        const business = {
          accountNumber,
          sortCode,
          preferredPayMethod: 'card',
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
      success,
      successMessage,
    } = this.state;
    return (
      <div className="business__details-container">
        {err && <span className="err__msg-box">* {errMsg} !</span>}
        {success && <span className="success__msg-box">{successMessage}</span>}
        <Form className="business__details-form" onSubmit={this.handleBusiness}>
          <Form.Item
            className="business__form-item"
            label="Your Bank Account Number"
          >
            {getFieldDecorator('accountNumber', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your bank account number.',
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
                  message: 'Please enter your bank sort code.',
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
        </Form>
        <Button className="business__next-btn" htmlType="submit">
          Save and Next
        </Button>
      </div>
    );
  }
}

const BusinessDetailsForm = Form.create({ name: 'BusinessDetails' })(
  BusinessDetails
);

const mapStateToProps = state => {
  return state.auth;
};

export default connect(mapStateToProps, null)(withRouter(BusinessDetailsForm));
