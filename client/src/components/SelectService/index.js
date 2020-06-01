/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Select } from 'antd';
import { Loading } from '..';

import getAllServices from './api';
import editServiceAction from './selectService.actions';

import './style.css';

const { Option } = Select;

class SelectService extends Component {
  state = {
    loading: false,
    services: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const services = await getAllServices();
    this.setState({ services, loading: false });
  }

  handleEdit = value => {
    const { editServiceAction: editService } = this.props;
    if (value) {
      return editService({
        fieldName: 'serviceName',
        value,
      });
    }
    return editService({
      fieldName: 'serviceName',
      value: '',
    });
  };

  render() {
    let currentService = {};
    const { services, loading } = this.state;
    const { status } = this.props;
    if (status === 'editService') {
      const { service } = this.props;
      currentService = service;
    }
    return (
      <>
        {!loading ? (
          !services.length ? (
            <p>No services</p>
          ) : status === 'editService' ? (
            // edit service
            <>
              <Select
                className="services__select"
                defaultValue={currentService.name}
                allowClear
                placeholder="Select service name"
                onChange={this.handleEdit}
              >
                {services.map(service => (
                  <Option key={service.name}>{service.name}</Option>
                ))}
              </Select>
            </>
          ) : (
            //  add new service
            <Select
              className="services__select"
              placeholder="Select service name"
            >
              {services.map(service => (
                <Option key={service.service_id}>{service.name}</Option>
              ))}
            </Select>
          )
        ) : (
          <Loading />
        )}
      </>
    );
  }
}

export default connect(null, { editServiceAction })(SelectService);
