import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { Loading } from '../components';

const LoggedOutRoute = ({
  component: Component,
  isAuth,
  loading,
  location,
  ...rest
}) => {
  const pathname = location.state && location.state.from;
  if (loading) {
    return <Loading />;
  }
  if (isAuth) {
    return <Redirect to={pathname || '/'} />;
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
