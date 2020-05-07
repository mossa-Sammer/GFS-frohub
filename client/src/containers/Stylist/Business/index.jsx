import React, { Component } from 'react';
import { Button, Tabs } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import BusinessDetails from './Details';
import Finance from './Finance';

import { SALON_URL } from '../../../routes_urls';

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
        <Button className="business__next-btn">
          <Link to={SALON_URL}>Next</Link>
        </Button>
      </div>
    );
  }
}

export default withRouter(Business);
