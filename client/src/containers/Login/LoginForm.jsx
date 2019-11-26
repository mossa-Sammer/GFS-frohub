import React from 'react';
import { Form, Icon, Spin } from 'antd';
import { Redirect } from 'react-router-dom';

import { Link, Input, Checkbox, Button } from '../../components';

const LoginForm = ({
  isAuth,
  loading,
  error,
  handleSubmit,
  form: { getFieldDecorator },
}) => {
  if (isAuth) {
    return <Redirect to="/" />;
  }
  return (
    <div className="login">
      <Form onSubmit={handleSubmit}>
        <h1>
          <Link href="/">
            <div className="login__logo" />
          </Link>
        </h1>
        <Form.Item className="login__item" label="Username or Email Address">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="username/email"
              error={error && error.username}
            />
          )}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              error={error && error.password}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Button
            type="primary"
            htmlType="submit"
            className="login__button"
            disabled={!!loading}
          >
            {loading ? <Spin /> : 'Log in'}
          </Button>
          <div className="login__register">
            <Link href="/signup">Register</Link> |{' '}
            <Link href="/lost-pass">Lost your password?</Link>
          </div>
        </Form.Item>
        <div>
          <Link href="/">
            <Icon type="swap-left" /> Back to FroHub
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
