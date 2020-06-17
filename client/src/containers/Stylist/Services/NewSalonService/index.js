/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button, Modal, message } from 'antd';

import {
  Loading,
  SelectService,
  ServiceInput,
  SelectServiceLength,
  ServiceLengthInput,
  ServicePriceInput,
  SalonServiceImages,
} from '../../../../components';

import addService from '../EditService/helper';
import addServiceAction from './newService.actions';
import { STYLIST_SERVICES_URL } from '../../../../routes_urls';

class NewSalonService extends Component {
  state = {
    visible: false,
    loading: false,
    success: false,
    successMsg: '',
  };

  handleNewService = async () => {
    const {
      serviceName,
      serviceNewName,
      serviceLength,
      serviceNewLength,
      price,
      images,
      history,
      addServiceAction: addNewService,
    } = this.props;
    const salonId = 2;

    if (
      (serviceNewName && serviceName) ||
      !(serviceNewName || serviceName) ||
      (serviceLength && serviceNewLength) ||
      !(serviceLength || serviceNewLength)
    ) {
      this.setState({
        visible: false,
      });
      return addNewService({
        fieldName: 'serviceError',
        value: 'You should choose one',
      });
    }

    if (!price || !images.length) {
      this.setState({
        visible: false,
      });
      return addNewService({
        fieldName: 'serviceError',
        value: 'All fields are required',
      });
    }
    const { err, errMsg, success, successMsg } = await addService({
      serviceName,
      serviceNewName,
      serviceLength,
      serviceNewLength,
      price,
      salonId,
      images,
      status: 'new',
    });
    this.setState({ visible: false });
    if (err)
      return addNewService({
        fieldName: 'serviceError',
        value: errMsg,
      });
    if (success) this.setState({ success, successMsg });
    setTimeout(() => history.push(STYLIST_SERVICES_URL), 3000);
  };

  handleCancel = () => this.setState({ visible: false });

  showModal = () => this.setState({ visible: true });

  render() {
    const status = 'newService';
    const { loading, visible, success, successMsg } = this.state;
    const { err, errMsg } = this.props;
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
                <p>Hair Length:</p>
                <SelectServiceLength status={status} />
              </div>
              <ServiceLengthInput status={status} />
              <div className="new__service__form-item">
                <p>Price: </p>
                <ServicePriceInput status={status} />
              </div>
              <div className="new__service__form-item">
                <p>
                  upload up to 3 pictures for this service. Have a look on our{' '}
                  <span className="guideline-link">
                    Guidelines for best picture practices.
                  </span>
                </p>
                <SalonServiceImages status={status} />
              </div>
              <div className="new__service__form-item">
                <Button
                  className="new__service__form-btn"
                  onClick={this.showModal}
                >
                  Save
                </Button>
              </div>
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

const mapStateToProps = state => {
  const {
    newSalonService: {
      serviceName,
      serviceNewName,
      serviceLength,
      serviceNewLength,
      price,
      images,
      err,
      errMsg,
    },
  } = state;
  return {
    serviceName,
    serviceNewName,
    serviceLength,
    serviceNewLength,
    price,
    images,
    err,
    errMsg,
  };
};

export default connect(mapStateToProps, { addServiceAction })(
  withRouter(NewSalonService)
);
