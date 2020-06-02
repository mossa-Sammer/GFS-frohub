import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Button, Modal, message } from 'antd';

import {
  Loading,
  SelectService,
  ServiceInput,
  SelectServiceLength,
  ServiceLengthInput,
  ServicePriceInput,
} from '../../../../components';

class NewSalonService extends Component {
  state = {
    visible: false,
    loading: false,
    success: false,
    successMsg: '',
    err: false,
    errMsg: '',
  };

  handleNewService = () => this.setState({ visible: false });

  handleCancel = () => this.setState({ visible: false });

  showModal = () => this.setState({ visible: true });

  render() {
    const status = 'newService';
    const { loading, visible, success, successMsg, err, errMsg } = this.state;
    return (
      <>
        {!loading ? (
          <div>
            {err && <div className="err-msg"> {message.error(errMsg, 2)} </div>}
            {success && (
              <div className="success-msg">
                {' '}
                {message.success(successMsg, 2)}{' '}
              </div>
            )}
            <div className="new__service-form">
              <div className="new__service__form-item">
                <p>Select Service:</p>
                <SelectService status={status} />
              </div>
              <ServiceInput status={status} />
              <div className="new__service__form-item">
                <p>Select service length:</p>
                <SelectServiceLength status={status} />
              </div>
              <ServiceLengthInput status={status} />
              <div className="new__service__form-item">
                <p>Price: </p>
                <ServicePriceInput status={status} />
              </div>
              <Button
                className="new__service__form-btn"
                onClick={this.showModal}
              >
                Save
              </Button>
              <Modal
                title="Add new Service"
                visible={visible}
                onOk={this.handleNewService}
                onCancel={this.handleCancel}
              >
                <p>Are you sure to add this service </p>
              </Modal>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}

export default withRouter(NewSalonService);
