import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form } from 'antd';
import { Input, Button, Loading } from '../../components';
import { signupUser, resetErrAction } from './signupAction';

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
    const { loading, isAuth, error } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { resetErrAction: resetErr } = this.props;
    return (
      <>
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
              normalize: val => {
                resetErr('username');
                return val;
              },
            })(
              <Input
                placeholder="Username"
                name="username"
                error={error && error.username}
              />
            )}
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
              normalize: val => {
                resetErr('email');
                return val;
              },
            })(<Input name="email" error={error && error.email} />)}
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
            <Button htmlType="submit" disabled={!!loading}>
              {' '}
              {loading ? <Loading /> : 'Signup'}{' '}
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    loading: state.signup.loading,
    error: state.signup.error,
  };
};
const formComp = Form.create({})(SignupForm);
export default connect(mapStateToProps, { signupUser, resetErrAction })(
  formComp
);
