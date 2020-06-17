import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import BusinessDetails from './Details';

import './style.css';

class Business extends Component {
  render() {
    return (
      <div className="business__container">
        <h1>Business Details</h1>
        <BusinessDetails />
      </div>
    );
  }
}

export default withRouter(Business);
