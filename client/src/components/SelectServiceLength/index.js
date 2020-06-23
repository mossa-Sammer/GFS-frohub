/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Select } from 'antd';
import { Loading } from '..';

import { getServicesLengthes } from '../../containers/Stylist/Services/SalonServices/api';
import editServiceAction from '../../containers/Stylist/Services/EditService/editService.actions';
import addServiceAction from '../../containers/Stylist/Services/NewSalonService/newService.actions';

const { Option } = Select;

class SelectService extends Component {
  state = {
    loading: false,
    servicesLengthes: [],
  };

  async componentDidMount() {
    const { status } = this.props;

    if (status === 'editService') {
      const {
        serviceLength: { name },
        editServiceAction: editService,
      } = this.props;
      if (name)
        editService({
          fieldName: 'serviceLength',
          value: name,
        });
    }

    this.setState({ loading: true });
    const servicesLengthes = await getServicesLengthes();
    this.setState({ servicesLengthes, loading: false });
  }

  handleEdit = value => {
    const { editServiceAction: editService } = this.props;

    if (value) {
      return editService({
        fieldName: 'serviceLength',
        value,
      });
    }
    return editService({
      fieldName: 'serviceLength',
      value: '',
    });
  };

  handleAdd = value => {
    const { addServiceAction: addService } = this.props;

    if (value) {
      return addService({
        fieldName: 'serviceLength',
        value,
      });
    }
    return addService({
      fieldName: 'serviceLength',
      value: '',
    });
  };

  render() {
    let currentServiceLength = {};
    const { servicesLengthes, loading } = this.state;
    const { status } = this.props;
    if (status === 'editService') {
      const { serviceLength } = this.props;
      currentServiceLength = serviceLength;
    }
    return (
      <div>
        {!loading ? (
          !servicesLengthes.length ? (
            <p>No servicesLengthes</p>
          ) : status === 'editService' ? (
            // edit service length
            <>
              <Select
                className="services__select"
                defaultValue={currentServiceLength.name}
                allowClear
                placeholder="Select service name"
                onChange={this.handleEdit}
              >
                {servicesLengthes.map(length => (
                  <Option key={length.name}>{length.name}</Option>
                ))}
              </Select>
            </>
          ) : (
            //  add new service length
            <Select
              className="services__select"
              placeholder="Select service name"
              onChange={this.handleAdd}
              allowClear
            >
              {servicesLengthes.map(length => (
                <Option key={length.name}>{length.name}</Option>
              ))}
            </Select>
          )
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default connect(null, { editServiceAction, addServiceAction })(
  SelectService
);
