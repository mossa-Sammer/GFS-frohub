/* eslint-disable consistent-return */
import React, { Component } from 'react';

import { Form, Input } from 'antd';
import { Loading } from '../../../../components';

import axios from '../../../../axios-config';

export default class Business extends Component {
  state = {
    loading: true,
    hasBusiness: false,
    business: [],
  };

  async componentDidMount() {
    const { userId } = this.props;
    const { data } = await axios.get(`/admin/users/${userId}/business`);
    if (!data.length)
      return this.setState({ loading: false, hasBusiness: false });
    this.setState({ loading: false, business: data[0], hasBusiness: true });
  }

  render() {
    const { loading, hasBusiness, business } = this.state;
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {!hasBusiness ? (
              <p>This user hasn&apos;t business yet.</p>
            ) : (
              <Form>
                <Form.Item label="Bank Account Number">
                  <Input value={business.account_number} disabled />
                </Form.Item>
                <Form.Item label="Sort Code">
                  <Input value={business.sort_code} disabled />
                </Form.Item>
              </Form>
            )}
          </>
        )}
      </div>
    );
  }
}
