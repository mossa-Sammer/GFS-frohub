/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';

import { Modal, Button, Input } from 'antd';

import './style.css';

class ServiceTypeForm extends Component {
  state = {
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async () => {
    const { handleSubmit } = this.props;

    this.setState({
      confirmLoading: true,
    });

    await handleSubmit();

    this.setState({
      visible: false,
      confirmLoading: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { name, handleName } = this.props;
    const { visible, confirmLoading } = this.state;
    return (
      <div className="service-form">
        <Button
          type="primary"
          className="add-new-service"
          onClick={this.showModal}
        >
          add new
        </Button>
        <Modal
          title="New Service"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <div>
            <label className="name-label">
              Name:
              <Input
                id="serviceName"
                type="text"
                onChange={handleName}
                value={name}
              />
            </label>
          </div>
        </Modal>
      </div>
    );
  }
}
export default ServiceTypeForm;
