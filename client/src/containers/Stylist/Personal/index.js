import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Input, Select } from 'antd';

import axios from 'axios';
import { connect } from 'react-redux';

import { BUSINESS_URL } from '../../../routes_urls';
import validatePhone from './util';

import './style.css';

const { Option } = Select;

class PersonalForm extends Component {
  state = {
    country: '',
    error: false,
    countries: [],
  };

  async componentDidMount() {
    const { user, form } = this.props;

    const [{ data: fetchedUser }, { data: allCountries }] = await Promise.all([
      axios.get(`/api/user/${user.userId}/personal`),
      axios.get('/api/country.io/phone.json'),
    ]);

    const countries = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(allCountries)) {
      countries.push({ key, value });
    }

    const {
      email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      calling_code: callingCode,
      country,
    } = fetchedUser;

    form.setFieldsValue({
      email,
      firstName,
      lastName,
      phoneNumber,
      callingCode,
    });

    this.setState({ countries, country });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, history, user } = this.props;
    const { setFields } = form;
    form.validateFields(async (err, values) => {
      if (!err) {
        const { country } = this.state;
        try {
          await axios.post(`/api/user/${user.userId}/personal`, {
            ...values,
            country,
          });
          history.push(BUSINESS_URL);
        } catch (requestErr) {
          const {
            data: { errors },
          } = requestErr.response;
          if (errors.email) {
            setFields({
              email: {
                value: values.email,
                errors: [new Error(errors.email)],
              },
            });
          }
        }
      }
    });
  };

  handleFormChange = () => {
    const {
      form: { getFieldsError },
    } = this.props;

    const isError = Object.values(getFieldsError()).some(e => e !== undefined);
    this.setState({ error: isError });
  };

  handlePhonePrefix = value => this.setState({ country: value });

  handlePhoneValidation = (rule, value, callback) => {
    const { country } = this.state;
    if (!country) return callback();
    const { err, msg } = validatePhone(country, value);
    if (err === true) return callback(msg);
    return callback();
  };

  render() {
    const { error, countries } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const prefixSelector = getFieldDecorator('callingCode')(
      <Select
        style={{ width: 100 }}
        className="phone-code"
        showSearch
        filterOption={(input, option) =>
          option.props.children.indexOf(input) >= 0
        }
        onChange={this.handlePhonePrefix}
      >
        {countries.map(c => (
          <Option key={c.key} value={c.key}>
            {c.value}
          </Option>
        ))}
      </Select>
    );

    return (
      <div className="peronal-form__wrapper">
        <h1>Personal Details</h1>
        <Form
          className="personal-form"
          onChange={this.handleFormChange}
          onSubmit={this.handleSubmit}
        >
          <Form.Item className="email-field" label="Email Address">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'Please enter a valid email address',
                },
                {
                  required: true,
                  message: 'Please enter a valid email address',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item className="phone-field" label="Mobile Phone Number">
            {getFieldDecorator('phoneNumber', {
              rules: [
                {
                  required: true,
                  message: 'Please enter a valid mobile phone number',
                },
                {
                  whitespace: true,
                  message: 'Please enter a valid mobile phone number',
                },
                { validator: this.handlePhoneValidation },
              ],
            })(
              <Input
                addonBefore={prefixSelector}
                onChange={this.handlePhoneChange}
              />
            )}
          </Form.Item>
          <div className="name-wrapper">
            <Form.Item className="first-name-field" label="First Name">
              {getFieldDecorator('firstName', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter your first name',
                  },
                  {
                    whitespace: true,
                    message: 'Please enter your first name',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item className="last-name-field" label="Last Name">
              {getFieldDecorator('lastName', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter your last name',
                  },
                  {
                    whitespace: true,
                    message: 'Please enter your last name',
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
              Save and Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ login }) => {
  return {
    user: login.loggedUser,
  };
};
const WrappedPersonalForm = Form.create({
  name: 'personal',
})(PersonalForm);

export default connect(mapStateToProps, null)(withRouter(WrappedPersonalForm));
