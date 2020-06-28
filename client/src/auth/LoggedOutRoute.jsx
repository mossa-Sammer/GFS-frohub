import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { Loading } from '../components';

const LoggedOutRoute = ({
  component: Component,
  isAuth,
  loading,
  loggedUser,
  location,
  ...rest
}) => {
  const pathname = location.state && location.state.from;
  if (loading) {
    return <Loading />;
  }
  if (isAuth) {
    const { role } = loggedUser;
    if (role === 'admin') return <Redirect to={pathname || '/admin'} />;
    return <Redirect to={pathname || '/partner'} />;
  }
  return <Route {...rest} component={Component} />;
};
const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    loading: state.auth.loading,
    loggedUser: state.login.loggedUser,
  };
};

export default connect(mapStateToProps)(LoggedOutRoute);
