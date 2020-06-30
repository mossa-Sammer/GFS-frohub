/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Tabs } from 'antd';

import { ServiceTypeTable, ServiceLengthTable } from '../../../components';

import './style.css';

class Services extends Component {
  render() {
    return (
      <div className="services-admin-page">
        <h2>Services</h2>
        <Tabs>
          <Tabs.TabPane tab="Services Type" key="1">
            <ServiceTypeTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Hair Length" key="2">
            <ServiceLengthTable />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Services;
