/* eslint-disable no-nested-ternary, consistent-return */
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Button, Modal, message } from 'antd';
import {
  Loading,
  SelectService,
  SelectServiceLength,
  ServicePriceInput,
  ServicesImages,
  ServiceImageUploader,
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
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { location } = this.props;
    const { search, state } = location;
    if (state) {
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
    } else {
      const serviceId = search.split('?')[1];
      const salonService = await getSalonService(serviceId);
      const serviceLength = await getSalonServiceLength(serviceId);
      const { service_id: salonServiceId, name: serviceName } = salonService;

      this.setState({
        loading: false,
        service: salonService,
        serviceName,
        salonServiceId,
        serviceLength,
      });
    }
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
      currentImages,
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

    if (!price || !images.length || !currentImages.length) {
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
      images: currentImages.concat(images),
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

    const { err, errMsg, imagesLength, length } = this.props;

    return (
      <>
        {!loading ? (
          <>
            <div className="edit__service-container">
              <h2>
                Edit {serviceName} {salonServiceName}
              </h2>
              {err && (
                <div className="err-msg"> {message.error(errMsg, 2)} </div>
              )}
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
                <div className="edit__service__form-item">
                  <p>Hair Length:</p>
                  <SelectServiceLength
                    status={status}
                    serviceLength={serviceLength}
                  />
                </div>
                <div className="edit__service__form-item">
                  <p>
                    If you cannot find your service or hair length listed,
                    please contact us at partner@frohub.com.
                  </p>
                </div>
                <div className="edit__service__form-item">
                  <p>Price: </p>
                  <ServicePriceInput status={status} price={price} />
                </div>
                <div className="service__images-title">
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
                </div>
                {/* <div className="new__service__form-item"> */}
                <ServicesImages salonServiceId={salonServiceId} />
                {/* </div> */}
                <div className="new__service__form-item">
                  {imagesLength >= 3 ? null : (
                    <ServiceImageUploader
                      status={status}
                      length={length + imagesLength}
                    />
                  )}
                </div>
                <Modal
                  title={`edit ${serviceName}`}
                  visible={visible}
                  onOk={this.handleEdit}
                  onCancel={this.handleCancel}
                >
                  <p>Are you sure to edit {serviceName} </p>
                </Modal>
              </div>
              {/* <div className="edit__service__form-item">
                <p>
                  If you cannot find your service or hair length listed, please
                  contact us at partner@frohub.com.
                </p>
              </div> */}
              <div className="edit__service__form-item edit__btn-item">
                <Button
                  className="edit__service__form-btn"
                  onClick={this.showModal}
                >
                  Save and Next
                </Button>
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  const { editSalonService, serviceImages } = state;
  const {
    serviceName,
    serviceNewName,
    serviceLength,
    serviceNewLength,
    price,
    images,
    err,
    errMsg,
    length,
  } = editSalonService;
  const { images: currentImages, imagesLength } = serviceImages;
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
    currentImages,
    imagesLength,
  };
};

export default connect(mapStateToProps, { editServiceAction })(EditService);
