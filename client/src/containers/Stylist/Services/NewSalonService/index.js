/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button, Modal, message } from 'antd';

import {
  Loading,
  SelectService,
  SelectServiceLength,
  ServicePriceInput,
  ServiceImageUploader,
} from '../../../../components';

import addService from '../EditService/helper';
import addServiceAction from './newService.actions';
import { STYLIST_SERVICES_URL } from '../../../../routes_urls';

import './style.css';

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
    const { err, errMsg, length } = this.props;
    return (
      <div className="new__partner__service-container">
        {!loading ? (
          <>
            <div className="new__service__form-container">
              {err && (
                <div className="err-msg"> {message.error(errMsg, 2)} </div>
              )}
              {success && (
                <div className="success-msg">
                  {' '}
                  {message.success(successMsg, 2)}{' '}
                </div>
              )}
              <h2>Add New Service</h2>
              <div className="new__service-form">
                <div>
                  <p>Select Service:</p>
                  <div className="new__service__form-item">
                    <SelectService status={status} />
                  </div>
                </div>
                <div>
                  <p>Hair Length:</p>
                  <div className="edit__service__form-item">
                    <SelectServiceLength status={status} />
                  </div>
                </div>
                <div>
                  <p>Price: </p>
                  <div className="new__service__form-item">
                    <ServicePriceInput status={status} />
                  </div>
                </div>
                <div className="new__service__form-item">
                  <p>
                    Upload up to 3 pictures for this service. Have a look on our{' '}
                    <span className="guideline-link">
                      Guidelines for best picture practices.
                    </span>
                  </p>
                </div>
                <div className="new__service__form-item">
                  {length > 3 ? null : (
                    <ServiceImageUploader status={status} length={length} />
                  )}
                </div>
                <Modal
                  title="Add New Service"
                  visible={visible}
                  onOk={this.handleNewService}
                  onCancel={this.handleCancel}
                >
                  <p>
                    Please ensure you have completed all the required
                    information.
                  </p>
                </Modal>
              </div>
            </div>
            <div className="new__service__form-item add__new__service-btn">
              <Button
                className="new__service__form-btn"
                onClick={this.showModal}
              >
                Save and Next
              </Button>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
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
      length,
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
    length,
    err,
    errMsg,
  };
};

export default connect(mapStateToProps, { addServiceAction })(
  withRouter(NewSalonService)
);
