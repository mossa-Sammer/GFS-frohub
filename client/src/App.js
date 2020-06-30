import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Login,
  Signup,
  Home,
  PageNotFound,
  Services,
  Personal,
  Welcome,
  Business,
  Salon,
  StylistServices,
  Dashboard,
  Partners,
  ServicesByAdmin,
  EditService,
  NewService,
  ViewAdmin,
  EditAdmin,
  PartnerByAdmin,
  EditPartnerByAdmin,
  AddNewUserByAdmin,
} from './containers';
import { LoggedOutRoute, PartnerRoute, AdminRoute } from './auth';

import checkAuthAction from './auth/auth.action';

import {
  LOGIN_URL,
  SIGNUP_URL,
  HOME_URL,
  SERVICES_URL,
  STYLIST_URL,
  PERSONAL_URL,
  BUSINESS_URL,
  SALON_URL,
  STYLIST_SERVICES_URL,
  ADMIN_URL,
  ADMIN_PARTNERS_URLS,
  ADMIN_SERVICES_URLS,
  STYLIST_EDIT_SERVICE_URL,
  STYLIST_NEW_SERVICE_URL,
  ADMIN_PERSONAL,
  ADMIN_EDIT_URL,
  STYLIST_PERSONAL_BY_ADMIN,
  ADMIN_EDIT_STYLIST,
  ADMIN_ADD_USER,
} from './routes_urls';

import 'antd/dist/antd.css';

class App extends React.Component {
  componentDidMount() {
    const { checkAuth } = this.props;
    checkAuth();
  }

  render() {
    let role = '';
    const { user } = this.props;
    if (user) role = user.role;

    return (
      <div className="App">
        <Router>
          <Switch>
            <LoggedOutRoute exact path={SIGNUP_URL} component={Signup} />
            <LoggedOutRoute exact path={LOGIN_URL} component={Login} />
            <Route exact path={HOME_URL}>
              <Home />
            </Route>
            <Route exact path={SERVICES_URL}>
              <Services />
            </Route>
            {role && role === 'stylist' && (
              <Switch>
                <PartnerRoute exact path={STYLIST_URL} component={Welcome} />
                <PartnerRoute exact path={PERSONAL_URL} component={Personal} />
                <PartnerRoute exact path={BUSINESS_URL} component={Business} />
                <PartnerRoute exact path={SALON_URL} component={Salon} />
                <PartnerRoute
                  exact
                  path={STYLIST_SERVICES_URL}
                  component={StylistServices}
                />
                <PartnerRoute
                  exact
                  path={STYLIST_EDIT_SERVICE_URL}
                  component={EditService}
                />
                <PartnerRoute
                  exact
                  path={STYLIST_SERVICES_URL}
                  component={StylistServices}
                />
                <PartnerRoute
                  exact
                  path={STYLIST_NEW_SERVICE_URL}
                  component={NewService}
                />
                <Route
                  render={() => {
                    return <PageNotFound />;
                  }}
                />
              </Switch>
            )}
            {role && role === 'admin' && (
              <Switch>
                <AdminRoute exact path={ADMIN_URL} component={Dashboard} />
                <AdminRoute
                  exact
                  path={ADMIN_PARTNERS_URLS}
                  component={Partners}
                />
                <AdminRoute
                  exact
                  path={ADMIN_SERVICES_URLS}
                  component={ServicesByAdmin}
                />
                <AdminRoute exact path={ADMIN_PERSONAL} component={ViewAdmin} />
                <AdminRoute exact path={ADMIN_EDIT_URL} component={EditAdmin} />
                <AdminRoute
                  exact
                  path={STYLIST_PERSONAL_BY_ADMIN}
                  component={PartnerByAdmin}
                />
                <AdminRoute
                  exact
                  path={ADMIN_ADD_USER}
                  component={AddNewUserByAdmin}
                />
                <AdminRoute
                  exact
                  path={ADMIN_EDIT_STYLIST}
                  component={EditPartnerByAdmin}
                />
                <Route
                  render={() => {
                    return <PageNotFound />;
                  }}
                />
              </Switch>
            )}
            <Route
              render={() => {
                return <PageNotFound />;
              }}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { login } = state;
  return {
    user: login.loggedUser,
  };
};

export default connect(mapStateToProps, { checkAuth: checkAuthAction })(App);
