import React, { Component } from 'react';

import { message, Tabs } from 'antd';

import { Loading } from '../../../components';
import Personal from './Personal';
import Business from './Business';
import Salon from './Salon';
import Services from './Services';

import getUserPersonal from './api';

const { TabPane } = Tabs;

export default class Partner extends Component {
  state = {
    loading: true,
    user: {},
  };

  async componentDidMount() {
    const {
      location: { search },
    } = this.props;
    const userId = search.split('?')[1];
    try {
      const user = await getUserPersonal(userId);
      this.setState({ user, loading: false });
    } catch (err) {
      message.error(err.response.data.message);
    }
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div>
              <span>View user: {user.email} </span>
            </div>
            <Tabs defaultActiveKey="personal">
              <TabPane tab="Personal" key="personal">
                <Personal user={user} />
              </TabPane>
              <TabPane tab="Business" key="business">
                <Business />
              </TabPane>
              <TabPane tab="Salon" key="salon">
                <Salon />
              </TabPane>
              <TabPane tab="Servies" key="servies">
                <Services />
              </TabPane>
            </Tabs>
          </div>
        )}
      </div>
    );
  }
}
