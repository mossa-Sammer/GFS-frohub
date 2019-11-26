import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login, Signup, Home } from './containers';
import { PrivateRoute, LoggedOutRoute } from './auth';

import checkAuthAction from './auth/auth.action';

import { LOGIN_URL, SIGNUP_URL, HOME_URL } from './routes_urls';

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
            <PrivateRoute exact path={HOME_URL} component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect(null, { checkAuth: checkAuthAction })(App);
