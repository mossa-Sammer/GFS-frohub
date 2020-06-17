import React, { Component } from 'react';
import { Tabs } from 'antd';

import { withRouter } from 'react-router-dom';

import BusinessDetails from './Details';

class Business extends Component {
  render() {
    return (
      <div>
        <h1>Business Details</h1>
        <BusinessDetails />
      </div>
    );
  }
}

export default withRouter(Business);
