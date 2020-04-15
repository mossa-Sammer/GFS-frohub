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
} from './containers';
import { LoggedOutRoute, PrivateRoute } from './auth';

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
} from './routes_urls';

import 'antd/dist/antd.css';

class App extends React.Component {
  componentDidMount() {
    const { checkAuth } = this.props;
    checkAuth();
  }

  render() {
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
            <PrivateRoute exact path={STYLIST_URL} component={Welcome} />
            <PrivateRoute exact path={PERSONAL_URL} component={Personal} />
            <PrivateRoute exact path={BUSINESS_URL} component={Business} />
            <PrivateRoute exact path={SALON_URL} component={Salon} />
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

export default connect(null, { checkAuth: checkAuthAction })(App);
