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
  SalonServiceImages,
} from '../../../../components';

import { getSalonService, getSalonServiceLength } from '../SalonServices/api';
import editService from './helper';
import editServiceAction from './editService.actions';

import './style.css';

import { STYLIST_SERVICES_URL } from '../../../../routes_urls';

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
    salonServiceName: '',
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
      salon_service_name: salonServiceName,
    } = service;

    const salonService = await getSalonService(salonServiceId);
    const serviceLength = await getSalonServiceLength(salonServiceId);

    this.setState({
      service: salonService,
      loading: false,
      serviceName: name,
      salonServiceName,
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
      images,
      history,
      editServiceAction: handleEditService,
    } = this.props;

    const { salonServiceId, salonId } = this.state;

    if (
      (serviceNewName && serviceName) ||
      !(serviceNewName || serviceName) ||
      (serviceLength && serviceNewLength) ||
      !(serviceLength || serviceNewLength)
    ) {
      this.setState({
        visible: false,
      });
      return handleEditService({
        fieldName: 'serviceError',
        value: 'You should choose one',
      });
    }

    if (!price || !images.length) {
      this.setState({
        visible: false,
      });
      return handleEditService({
        fieldName: 'serviceError',
        value: 'All fields are required',
      });
    }

    const { err, errMsg, success, successMsg } = await editService({
      salonId,
      salonServiceId,
      serviceName,
      serviceNewName,
      serviceLength,
      serviceNewLength,
      price,
      images,
      status: 'edit',
    });

    this.setState({ visible: false });

    if (err) {
      return handleEditService({
        fieldName: 'serviceError',
        value: errMsg,
      });
    }

    if (success) this.setState({ success, successMsg });

    setTimeout(() => history.push(STYLIST_SERVICES_URL), 3000);
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
      serviceLength,
      salonServiceName,
      price,
      salonServiceId,
    } = this.state;

    const { err, errMsg } = this.props;

    return (
      <>
        {!loading ? (
          <div>
            <h2>
              Edit {serviceName} {salonServiceName}
            </h2>
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
                <p>Hair Length:</p>
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
              <div className="new__service__form-item">
                <p>
                  Upload up to 3 pictures for this service. Have a look at our
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://frohub.com/partner-photo-guidelines/"
                  >
                    {' '}
                    guidelines{' '}
                  </a>{' '}
                  for best picture practices.
                </p>
                <SalonServiceImages
                  status={status}
                  salonServiceId={salonServiceId}
                />
              </div>
              <div className="edit__service__form-item edit__btn-item">
                <Button
                  className="edit__service__form-btn"
                  onClick={this.showModal}
                >
                  Save and Next
                </Button>
              </div>
              <Modal
                title={`edit ${serviceName}`}
                visible={visible}
                onOk={this.handleEdit}
                onCancel={this.handleCancel}
              >
                <p>Are you sure to edit {serviceName} </p>
              </Modal>
              <div>
                <p>
                  If you cannot find your service or hair length listed, please
                  contact us at partner@frohub.com.
                </p>
              </div>
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
    images,
    err,
    errMsg,
  } = editSalonService;
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

export default connect(mapStateToProps, { editServiceAction })(EditService);
