import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';

import LoginForm from './LoginForm';
import loginAction from './login.action';

import './Login.css';

class LoginPage extends Component {
  handleSubmit = e => {
    const {
      form: { validateFields },
      login,
    } = this.props;

    e.preventDefault();
    validateFields(async (err, values) => {
      if (!err) {
        login(values);
      }
    });
  };

  render() {
    const { isAuth, loading, error, form } = this.props;
    return (
      <LoginForm
        handleSubmit={this.handleSubmit}
        isAuth={isAuth}
        loading={loading}
        error={error}
        form={form}
      />
    );
  }
}

const mapStateToProps = ({ login: { loading, error }, auth: { isAuth } }) => ({
  isAuth,
  loading,
  error,
});

export default connect(mapStateToProps, {
  login: loginAction,
})(Form.create({})(LoginPage));
