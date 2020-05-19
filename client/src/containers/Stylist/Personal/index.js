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
    changed: false,
    error: false,
    countries: [],
  };

  async componentDidMount() {
    const { user, form } = this.props;
    const [{ data: fetchedUser }, { data: allCountries }] = await Promise.all([
      axios.get(`/api/user/${user.userId}/personal`),
      axios.get(
        'https://cors-anywhere.herokuapp.com/http://country.io/phone.json'
      ),
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

    form.validateFields(async (err, values) => {
      if (!err) {
        const { country } = this.state;

        await axios.post(`/api/user/${user.userId}/personal`, {
          ...values,
          country,
        });

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

  handlePhonePrefix = value => this.setState({ country: value });

  handlePhoneValidation = (rule, value, callback) => {
    const { country } = this.state;
    if (!country) return callback();
    const { err, msg } = validatePhone(country, value);
    if (err === true) return callback(msg);
    return callback();
  };

  render() {
    const { changed, error, countries } = this.state;
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
      <div>
        <h3>Personal details</h3>
        <Form
          className="personal-form"
          onChange={this.handleFormChange}
          onSubmit={this.handleSubmit}
        >
          <Form.Item className="email-field" label="Email">
            {getFieldDecorator('email', {
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
            {getFieldDecorator('phoneNumber', {
              rules: [
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
                {
                  whitespace: true,
                  message: 'Please input your phone number!',
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

const mapStateToProps = ({ login }) => {
  return {
    user: login.user,
  };
};
const WrappedPersonalForm = Form.create({
  name: 'personal',
})(PersonalForm);

export default connect(mapStateToProps, null)(withRouter(WrappedPersonalForm));
