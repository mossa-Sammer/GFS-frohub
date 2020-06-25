/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Tabs } from 'antd';

import { ServiceTypeTable, ServiceLengthTable } from '../../../components';

class Services extends Component {
  render() {
    return (
      <div>
        <h2>Services</h2>
        <Tabs>
          <Tabs.TabPane tab="Services Types" key="1">
            <ServiceTypeTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Services lengthes" key="2">
            <ServiceLengthTable />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Services;
