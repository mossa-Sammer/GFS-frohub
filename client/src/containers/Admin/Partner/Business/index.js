/* eslint-disable consistent-return */
import React, { Component } from 'react';

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
              <p> The user has not submitted business details yet.</p>
            ) : (
              <div>
                <p>
                  <span style={{ fontWeight: 'bold' }}>
                    Bank Account Number:
                  </span>{' '}
                  {business.account_number}
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Bank Sort Code:</span>{' '}
                  {business.sort_code}{' '}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}
