/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import Input from '../../components/Input';
import Button from '../../components/Button';

import signupUser from './signupAction';

import './style.css';

class SignupForm extends Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log(333321, nextProps.auth);
    const { isAuth, error } = nextProps.auth;
    if (isAuth) {
      console.log('success');
    }
    // eslint-disable-next-line no-console
    console.log(22, error);
  }

  handleSubmit = e => {
    e.preventDefault();
    // eslint-disable-next-line react/prop-types
    const { form } = this.props;
    // eslint-disable-next-line react/prop-types
    form.validateFields((err, values) => {
      if (!err) {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.signupUser(values);
      }
    });
  };

  comparePasswords = (rule, value, cb) => {
    // eslint-disable-next-line react/prop-types
    const { form } = this.props;
    // eslint-disable-next-line react/prop-types
    if (value && value !== form.getFieldValue('password')) {
      cb(`Passwords doesn't matches`);
    } else {
      cb();
    }
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const {
      // eslint-disable-next-line react/prop-types
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="Username">
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
        <Form.Item label="E-mail">
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
        <Form.Item label="Password">
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
        <Form.Item label="Confirm Password">
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
    );
  }
}

const mapStateToProps = state => {
  console.log(666, state);
  return {
    auth: state.auth,
  };
};

const formComp = Form.create({})(SignupForm);

export default connect(mapStateToProps, { signupUser })(formComp);
