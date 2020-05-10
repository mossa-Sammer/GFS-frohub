import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Input, Select } from 'antd';

import axios from 'axios';

import countries from 'country-data';

import { BUSINESS_URL } from '../../../routes_urls';
import './style.css';

const { Option } = Select;

class PersonalForm extends Component {
  state = {
    // userId: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    // role: '',
    changed: false,
    error: false,
  };

  async componentDidMount() {
    const { data } = await axios.get('/api/user/2/personal');
    const {
      email,
      role,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      user_id: userId,
    } = data;

    const userData = { userId, email, firstName, lastName, phoneNumber, role };
    this.setState({ ...userData });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, history } = this.props;
    // eslint-disable-next-line no-unused-vars
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        history.push(BUSINESS_URL);
      }
    });
  };

  handleFormChange = () => {
    const { changed } = this.state;

    const {
      form: { getFieldsError },
    } = this.props;

    const isError = Object.values(getFieldsError()).some(e => e !== undefined);
    this.setState({ error: isError });

    if (!changed) this.setState({ changed: true });
  };

  render() {
    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      changed,
      error,
    } = this.state;

    const {
      form: { getFieldDecorator },
    } = this.props;

    const { all: codes } = countries.callingCodes;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '+44',
    })(
      <Select
        className="phone-code"
        showSearch
        filterOption={(input, option) =>
          option.props.children.indexOf(input) >= 0
        }
      >
        {codes.map(c => (
          <Option key={c} value={c}>
            {c}
          </Option>
        ))}
      </Select>
    );

    return (
      <div>
        <h3>Personal details</h3>
        <Form
          className="personal-form"
          onChange={this.handleFormChange}
          onSubmit={this.handleSubmit}
        >
          <Form.Item className="email-field" label="Email">
            {getFieldDecorator('email', {
              initialValue: email,
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item className="phone-field" label="Phone Number">
            {getFieldDecorator('phone-field', {
              initialValue: phoneNumber,
              rules: [
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
                {
                  whitespace: true,
                  message: 'Please input your phone number!',
                },
              ],
            })(<Input addonBefore={prefixSelector} />)}
          </Form.Item>
          <div className="name-wrapper">
            <Form.Item className="first-name-field" label="First Name">
              {getFieldDecorator('firstName', {
                initialValue: firstName,
                rules: [
                  {
                    required: true,
                    message: 'Please input your first name',
                  },
                  {
                    whitespace: true,
                    message: 'Please input your first name',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item className="last-name-field" label="Last Name">
              {getFieldDecorator('lastName', {
                initialValue: lastName,
                rules: [
                  {
                    required: true,
                    message: 'Please input your last name',
                  },
                  {
                    whitespace: true,
                    message: 'Please input your last name',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              className="personal-next-btn"
              type="primary"
              htmlType="submit"
              disabled={error}
            >
              {changed ? 'Save & Next' : 'Next'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedPersonalForm = Form.create({
  name: 'personal',
})(PersonalForm);

export default withRouter(WrappedPersonalForm);
