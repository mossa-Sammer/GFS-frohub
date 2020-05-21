import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

import getSalonServices from './api';

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
    const { history } = this.props;
    history.push({
      pathname: STYLIST_EDIT_SERVICE_URL,
      state: { detail: service },
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
            <div className="service__container" key={service.salon_service_id}>
              <span className="service_name">{service.name}</span>
              <div className="edit__service">
                <Button onClick={() => this.handleEdit(service)}>edit</Button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default withRouter(SalonServices);
