import React, { Component } from 'react';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';

import BusinessDetails from './Details';
import Finance from './Finance';

import './style.css';

const { TabPane } = Tabs;

class Business extends Component {
  render() {
    return (
      <div className="business-container">
        <Tabs defaultActiveKey="details" className="tabs__business-container">
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
