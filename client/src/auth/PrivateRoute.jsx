import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { Loading } from '../components';

import Sider from '../containers/Layout';
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
    return (
      <Layout>
        <Layout.Sider>
          <Sider />
        </Layout.Sider>
        <Layout.Content>
          <Route {...rest} component={Component} />
        </Layout.Content>
      </Layout>
    );
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
