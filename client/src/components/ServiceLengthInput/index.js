/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Input } from 'antd';

import editServiceAction from '../../containers/Stylist/Services/EditService/editService.actions';

class ServiceInput extends Component {
  handleChange = e => {
    const { status, editServiceAction: editService } = this.props;

    const {
      target: { value },
    } = e;

    if (status === 'editService') {
      if (value) {
        return editService({
          fieldName: 'serviceNewLength',
          value,
        });
      }
      return editService({
        fieldName: 'serviceNewLength',
        value: '',
      });
    }
  };

  render() {
    return (
      <div>
        <p>
          If you don&apos;t find your service length, please introduce it below.
        </p>
        <Input
          className="new__service-input"
          onChange={this.handleChange}
          name="newServiceLength"
        />
      </div>
    );
  }
}

export default connect(null, { editServiceAction })(ServiceInput);
