/* eslint-disable consistent-return */
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Button, Modal } from 'antd';
import { Loading, SelectService, ServiceInput } from '../../../../components';

import { getSalonService } from '../SalonServices/api';

import './style.css';

class EditService extends Component {
  state = {
    visible: false,
    service: {},
    loading: false,
    serviceName: '',
    err: false,
    errMsg: '',
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { location } = this.props;
    const { state } = location;
    const { service } = state;
    const { salon_service_id: salonServiceId, name } = service;
    const salonService = await getSalonService(salonServiceId);
    this.setState({ service: salonService, loading: false, serviceName: name });
  }

  handleEdit = () => {
    const { serviceName, serviceNewName } = this.props;
    this.setState({ err: false, errMsg: '' });
    if ((serviceNewName && serviceName) || !(serviceNewName || serviceName))
      return this.setState({
        err: true,
        errMsg: 'You should choose one',
        visible: false,
      });
    this.setState({ visible: false });
  };

  handleCancel = () => this.setState({ visible: false });

  showModal = () => this.setState({ visible: true });

  render() {
    const status = 'editService';
    const { loading, service, serviceName, visible, err, errMsg } = this.state;
    return (
      <>
        {!loading ? (
          <div>
            <h2>Edit {serviceName} Service</h2>
            {err && <span className="err-msg">{errMsg}</span>}
            <div className="edit__service-form">
              <SelectService status={status} service={service} />
              <ServiceInput status={status} />
              <Button onClick={this.showModal}>Save</Button>
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
  const { serviceName, serviceNewName } = editSalonService;
  return {
    serviceName,
    serviceNewName,
  };
};

export default connect(mapStateToProps)(EditService);
