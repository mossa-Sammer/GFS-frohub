import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Spin } from 'antd';
import { Input, Button } from '../../components';
import signupUser from './signupAction';

import './style.css';

class SignupForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    // eslint-disable-next-line no-shadow
    const { form, signupUser } = this.props;
    form.validateFields((err, values) => {
      if (!err) signupUser(values);
    });
  };

  comparePasswords = (rule, value, cb) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      cb(`Passwords doesn't matches`);
    } else cb();
  };

  render() {
    const {
      auth: { loading, isAuth, error },
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <>
        {loading && <Spin />}
        {error &&
          error.length &&
          error.map(item => {
            return <span className="signup__form-errMsg">{item}</span>;
          })}
        {isAuth && <Redirect to="/home" />}
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="Username" className="login__form-item">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  min: 6,
                  message: 'username should be at least 6 characters!',
                },
              ],
            })(<Input placeholder="Username" />)}
          </Form.Item>
          <Form.Item label="E-mail" className="login__form-item">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'Enter a valid email address',
                },
                {
                  required: true,
                  message: 'E-mail is required',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" className="login__form-item">
            {getFieldDecorator('password', {
              rules: [
                {
                  min: 6,
                  message: 'Password should be at least 6 characters',
                },
                {
                  required: true,
                  message: 'Password should be at least 6 characters',
                },
              ],
            })(<Input type="password" />)}
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            className="login__form-item confirm-item"
          >
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password',
                },
                {
                  validator: this.comparePasswords,
                },
              ],
            })(<Input type="password" />)}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit"> Signup </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.signup,
  };
};
const formComp = Form.create({})(SignupForm);
export default connect(mapStateToProps, { signupUser })(formComp);
