/* eslint-disable consistent-return */
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Button, Modal, message } from 'antd';
import {
  Loading,
  SelectService,
  ServiceInput,
  SelectServiceLength,
  ServiceLengthInput,
  ServicePriceInput,
} from '../../../../components';

import { getSalonService, getSalonServiceLength } from '../SalonServices/api';
import editService from './helper';

import './style.css';

class EditService extends Component {
  state = {
    visible: false,
    salonServiceId: null,
    salonId: null,
    service: {},
    serviceLength: {},
    price: '',
    loading: false,
    serviceName: '',
    success: false,
    successMsg: '',
    err: false,
    errMsg: '',
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { location } = this.props;
    const {
      state: { service },
    } = location;
    const {
      salon_id: salonId,
      salon_service_id: salonServiceId,
      name,
      price,
    } = service;
    const salonService = await getSalonService(salonServiceId);
    const serviceLength = await getSalonServiceLength(salonServiceId);
    this.setState({
      service: salonService,
      loading: false,
      serviceName: name,
      serviceLength,
      price,
      salonServiceId,
      salonId,
    });
  }

  handleEdit = async () => {
    const {
      serviceName,
      serviceNewName,
      serviceLength,
      serviceNewLength,
      price,
    } = this.props;
    const { salonServiceId, salonId } = this.state;
    this.setState({ err: false, errMsg: '' });
    if (
      (serviceNewName && serviceName) ||
      !(serviceNewName || serviceName) ||
      (serviceLength && serviceNewLength) ||
      !(serviceLength || serviceNewLength)
    )
      return this.setState({
        err: true,
        errMsg: 'You should choose one',
        visible: false,
      });
    if (!price)
      return this.setState({
        err: true,
        errMsg: 'All fields are required',
        visible: false,
      });
    const { err, errMsg, success, successMsg } = await editService({
      salonId,
      salonServiceId,
      serviceName,
      serviceNewName,
      serviceLength,
      serviceNewLength,
      price,
    });
    this.setState({ visible: false });
    if (err) return this.setState({ err, errMsg });
    if (success) return this.setState({ err: false, success, successMsg });
  };

  handleCancel = () => this.setState({ visible: false });

  showModal = () => this.setState({ visible: true });

  render() {
    const status = 'editService';
    const {
      loading,
      service,
      serviceName,
      visible,
      success,
      successMsg,
      err,
      errMsg,
      serviceLength,
      price,
    } = this.state;
    return (
      <>
        {!loading ? (
          <div>
            <h2>Edit {serviceName} Service</h2>
            {err && <div className="err-msg"> {message.error(errMsg, 2)} </div>}
            {success && (
              <div className="success-msg">
                {' '}
                {message.success(successMsg, 2)}{' '}
              </div>
            )}
            <div className="edit__service-form">
              <div className="edit__service__form-item">
                <p>Select Service:</p>
                <SelectService status={status} service={service} />
              </div>
              <ServiceInput status={status} />
              <div className="edit__service__form-item">
                <p>Select service length:</p>
                <SelectServiceLength
                  status={status}
                  serviceLength={serviceLength}
                />
              </div>
              <ServiceLengthInput status={status} />
              <div className="edit__service__form-item">
                <p>Price: </p>
                <ServicePriceInput status={status} price={price} />
              </div>
              <Button
                className="edit__service__form-btn"
                onClick={this.showModal}
              >
                Save
              </Button>
              <Modal
                title={`edit ${serviceName}`}
                visible={visible}
                onOk={this.handleEdit}
                onCancel={this.handleCancel}
              >
                <p>Are you sure to edit {serviceName} </p>
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
  const { editSalonService } = state;
  const {
    serviceName,
    serviceNewName,
    serviceLength,
    serviceNewLength,
    price,
  } = editSalonService;
  return {
    serviceName,
    serviceNewName,
    serviceLength,
    serviceNewLength,
    price,
  };
};

export default connect(mapStateToProps)(EditService);
