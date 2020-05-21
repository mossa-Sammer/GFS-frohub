import React, { Component } from 'react';

import getSalonServices from './api';

import { Loading } from '../../../../components';

import './style.css';
import { Icon, Button } from 'antd';

export default class SalonServices extends Component {
  state = {
    salonServices: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const salonServices = await getSalonServices(2);
    this.setState({ salonServices, loading: false });
  }

  render() {
    const { salonServices, loading } = this.state;
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          salonServices.length &&
          salonServices.map(service => (
            <div className="service__container" key={service.salon_service_id}>
              <span className="service_name">{service.name}</span>
              <div className="edit__service">
                <Button>edit</Button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}
