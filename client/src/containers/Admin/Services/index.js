/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Table, Divider, Tabs, Tag } from 'antd';

import { ServiceTypeForm } from '../../../components';
import Axios from '../../../axios-config';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
    render: text => (
      <Tag color={text === 'active' ? 'green' : 'geekblue'}>{text}</Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <span>
        <a>Edit</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    ),
  },
];
class Services extends Component {
  state = {
    services: [],
    name: '',
    status: 'inactive',
  };

  async componentDidMount() {
    const {
      data: { data: services },
    } = await Axios.get('/admin/services');
    const normalizedData = this.normalizeData(services);
    this.setState({ services: normalizedData });
  }

  normalizeData = data => {
    return data.map(d => {
      const { service_id: serviceId, name, status } = d;
      return {
        id: serviceId,
        name,
        status,
      };
    });
  };

  handleAdd = async () => {
    const { services, name, status } = this.state;
    const clonedServices = [...services];
    try {
      const {
        data: { data: service },
      } = await Axios.post('/admin/services', { name, status });
      this.setState({
        services: [...clonedServices, ...this.normalizeData([service])],
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleNameChange = ({ target }) => {
    const { value } = target;
    this.setState({ name: value });
  };

  handleStatusChange = ({ target }) => {
    const { value } = target;
    this.setState({ status: value });
  };

  render() {
    const { services, name, status } = this.state;

    return (
      <div>
        <h2>Services</h2>
        <Tabs>
          <Tabs.TabPane tab="Services Types" key="1">
            <ServiceTypeForm
              name={name}
              status={status}
              handleName={this.handleNameChange}
              handleStatus={this.handleStatusChange}
              handleSubmit={this.handleAdd}
            />
            <Table
              columns={columns}
              dataSource={services}
              onChange={this.handleChange}
              rowKey={record => record.id}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Services lengthes" key="2">
            lengths
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Services;
