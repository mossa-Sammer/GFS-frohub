import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Loading } from '../components';

import { LOGIN_URL } from '../routes_urls';

const PrivateRoute = ({
  component: Component,
  isAuth,
  loading,
  location,
  ...rest
}) => {
  if (loading) {
    return <Loading />;
  }
  if (isAuth) {
    return <Route {...rest} component={Component} />;
  }
  return (
    <Redirect
      to={{ pathname: LOGIN_URL, state: { from: location.pathname } }}
    />
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
