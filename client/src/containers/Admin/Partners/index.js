/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';

import { message, Button } from 'antd';

import getAllPartners from './api';

import { Loading } from '../../../components';

import './style.css';
import './media.css';

export default class Partners extends Component {
  state = {
    loading: true,
    users: [],
  };

  async componentDidMount() {
    try {
      const users = await getAllPartners();
      this.setState({ users, loading: false });
    } catch (err) {
      message.error(err.response.data.message);
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, users } = this.state;
    return (
      <>
        <div className="add__new__user-container">
          <Button className="add__new__user-btn">Add New User</Button>
        </div>
        {loading ? (
          <Loading />
        ) : !users.length ? (
          <p>There is no users</p>
        ) : (
          <div>{console.log(88888888888, users)}</div>
        )}
      </>
    );
  }
}
