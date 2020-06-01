import React, { Component } from 'react';
import { Loading, SelectService, ServiceInput } from '../../../../components';

import { getSalonService } from '../SalonServices/api';

export default class EditService extends Component {
  state = {
    service: {},
    loading: false,
    serviceName: '',
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

  render() {
    // const { location } = this.props;
    // const { search } = location;
    // console.log(
    //   search
    //     .replace('?', '')
    //     .replace('%', '')
    //     .split(/(\d+)/)
    // );
    const status = 'editService';
    const { loading, service, serviceName } = this.state;
    return (
      <>
        {!loading ? (
          <div>
            <h2>Edit {serviceName} Service</h2>
            <SelectService status={status} service={service} />
            <ServiceInput status={status} />
          </div>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}
