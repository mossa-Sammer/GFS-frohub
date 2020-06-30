/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';

import { message, Tabs } from 'antd';

import { Loading } from '../../../components';
import Personal from './Personal';
import Business from './Business';
import Salon from './Salon';
import Services from './Services';

import getUserPersonal from './api';

import './style.css';

const { TabPane } = Tabs;

export default class Partner extends Component {
  state = {
    loading: true,
    user: {},
    isUser: false,
  };

  async componentDidMount() {
    const {
      location: { search },
    } = this.props;
    const userId = search.split('?')[1];
    try {
      const { isUser, data: user } = await getUserPersonal(userId);
      this.setState({ isUser, user, loading: false });
    } catch (err) {
      message.error(err.response.data.message);
    }
  }

  render() {
    const { loading, user, isUser } = this.state;
    return (
      <div>
        {loading ? (
          <Loading />
        ) : !isUser ? (
          <h2>Not A user</h2>
        ) : (
          <div>
            <div className="partner__email-container">
              <span>View user: {user.email} </span>
            </div>
            <Tabs defaultActiveKey="personal" className="partner__tabs">
              <TabPane tab="Personal" key="personal">
                <Personal user={user} />
              </TabPane>
              <TabPane tab="Business" key="business">
                <Business userId={user.user_id} />
              </TabPane>
              <TabPane tab="Salon" key="salon">
                <Salon />
              </TabPane>
              <TabPane tab="Services" key="services">
                <Services />
              </TabPane>
            </Tabs>
          </div>
        )}
      </div>
    );
  }
}
