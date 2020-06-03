/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Input } from 'antd';

import editServiceAction from '../../containers/Stylist/Services/EditService/editService.actions';

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
    const { status, editServiceAction: editService } = this.props;

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

export default connect(null, { editServiceAction })(ServiceInput);
