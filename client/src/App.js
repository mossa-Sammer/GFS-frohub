import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login, Signup, Home, PageNotFound, ServicesPage } from './containers';
import { LoggedOutRoute } from './auth';

import checkAuthAction from './auth/auth.action';

import { LOGIN_URL, SIGNUP_URL, HOME_URL, SERVICES_URL } from './routes_urls';

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
              <ServicesPage />
            </Route>
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
