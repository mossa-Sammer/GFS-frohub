import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'antd';

import { getSalonServices } from './api';

import { STYLIST_EDIT_SERVICE_URL } from '../../../../routes_urls';

import { Loading } from '../../../../components';

import './style.css';

class SalonServices extends Component {
  state = {
    salonServices: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const salonServices = await getSalonServices(2);
    this.setState({ salonServices, loading: false });
  }

  handleEdit = service => {
    const {
      name,
      salon_service_id: salonServiceId,
      salon_service_name: salonServiceName,
    } = service;
    const { history } = this.props;
    history.push({
      pathname: STYLIST_EDIT_SERVICE_URL,
      search: `${name} ${salonServiceName} ${salonServiceId}`,
      state: { service },
    });
  };

  render() {
    const { salonServices, loading } = this.state;
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          salonServices.length &&
          salonServices.map(service => (
            <div className="service__container" key={Math.random()}>
              <span className="service_name">
                {service.salon_service_name} {service.name}
              </span>
              <div className="edit__service">
                <Button
                  className="edit__service-btn"
                  onClick={() => this.handleEdit(service)}
                >
                  <Icon type="setting" />
                  Edit
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default withRouter(SalonServices);
