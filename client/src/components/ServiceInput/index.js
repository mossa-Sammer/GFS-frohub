/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Input } from 'antd';

import editServiceAction from '../../containers/Stylist/Services/EditService/editService.actions';
import addServiceAction from '../../containers/Stylist/Services/NewSalonService/newService.actions';

import './style.css';

class ServiceInput extends Component {
  handleChange = e => {
    const {
      status,
      editServiceAction: editService,
      addServiceAction: addService,
    } = this.props;

    const {
      target: { value },
    } = e;

    if (status === 'editService') {
      if (value) {
        return editService({
          fieldName: 'serviceNewName',
          value,
        });
      }
      return editService({
        fieldName: 'serviceNewName',
        value: '',
      });
    }
    if (value) {
      return addService({
        fieldName: 'serviceNewName',
        value,
      });
    }
    return addService({
      fieldName: 'serviceNewName',
      value: '',
    });
  };

  render() {
    return (
      <div>
        <p>If you don&apos;t find your service, please introduce it below.</p>
        <Input
          className="new__service-input"
          onChange={this.handleChange}
          name="newServiceName"
        />
      </div>
    );
  }
}

export default connect(null, { editServiceAction, addServiceAction })(
  ServiceInput
);
