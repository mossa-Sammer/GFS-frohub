/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Table } from 'antd';
import ServiceTypeForm from '../ServiceTypeForm';
import Columns from '../ServicesTableColumns';
import Axios from '../../axios-config';

class ServiceLengthTable extends Component {
  state = {
    services: [],
    name: '',
    status: 'inactive',
  };

  async componentDidMount() {
    const {
      data: { data: services },
    } = await Axios.get('/admin/services/lengthes');
    const normalizedData = this.normalizeData(services);
    this.setState({ services: normalizedData });
  }

  normalizeData = data => {
    return data.map(d => {
      const { service_length_id: serviceId, name, status } = d;
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
      } = await Axios.post('/admin/services/lengthes', { name, status });
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
        <h2>Hair Length</h2>
        <ServiceTypeForm
          name={name}
          status={status}
          handleName={this.handleNameChange}
          handleStatus={this.handleStatusChange}
          handleSubmit={this.handleAdd}
        />
        <Table
          columns={Columns}
          dataSource={services}
          onChange={this.handleChange}
          rowKey={record => record.id}
        />
      </div>
    );
  }
}

export default ServiceLengthTable;
