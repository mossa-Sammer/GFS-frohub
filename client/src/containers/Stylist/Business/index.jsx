import React, { Component } from 'react';
import { Tabs } from 'antd';

import { withRouter } from 'react-router-dom';

import BusinessDetails from './Details';
import Finance from './Finance';

const { TabPane } = Tabs;

class Business extends Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Business Details" key="details">
            <BusinessDetails />
          </TabPane>
          <TabPane tab="Finance" key="finance">
            <Finance />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default withRouter(Business);
