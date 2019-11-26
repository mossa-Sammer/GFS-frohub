import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { Spin } from 'antd';

const LoggedOutRoute = ({
  component: Component,
  isAuth,
  loading,
  location,
  ...rest
}) => {
  const pathname = location.state && location.state.from;
  if (loading) {
    return <Spin />;
  }
  if (isAuth) {
    return <Redirect to={{ pathname: pathname || '/' }} />;
  }
  return <Route {...rest} component={Component} />;
};
const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(LoggedOutRoute);
