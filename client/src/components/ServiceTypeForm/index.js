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
    const { name, handleName, status } = this.props;
    const { visible, confirmLoading } = this.state;
    const isServiceType = status === 'type';

    return (
      <div className="service-form">
        <Button
          type="primary"
          className="add-new-service"
          onClick={this.showModal}
        >
          {isServiceType ? <>Add New Service</> : <>Add New Length</>}
        </Button>
        <Modal
          title={isServiceType ? 'New Service' : 'New Hair Length'}
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
