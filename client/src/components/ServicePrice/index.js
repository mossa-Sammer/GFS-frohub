/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Input } from 'antd';

import editServiceAction from '../../containers/Stylist/Services/EditService/editService.actions';
import addServiceAction from '../../containers/Stylist/Services/NewSalonService/newService.actions';

class ServiceInput extends Component {
  async componentDidMount() {
    const { status } = this.props;

    if (status === 'editService') {
      const { price, editServiceAction: editService } = this.props;
      if (price)
        editService({
          fieldName: 'servicePrice',
          value: price,
        });
    }
  }

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
          fieldName: 'servicePrice',
          value,
        });
      }
      return editService({
        fieldName: 'servicePrice',
        value: '',
      });
    }
    if (value) {
      return addService({
        fieldName: 'servicePrice',
        value,
      });
    }
    return addService({
      fieldName: 'servicePrice',
      value: '',
    });
  };

  render() {
    let defaultPrice = '';
    const { status } = this.props;

    if (status === 'editService') {
      const { price } = this.props;
      defaultPrice = price;
    }

    return (
      <Input
        className="new__service-input"
        onChange={this.handleChange}
        name="servicePrice"
        defaultValue={defaultPrice}
      />
    );
  }
}

export default connect(null, { editServiceAction, addServiceAction })(
  ServiceInput
);
