/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, Icon } from 'antd';

import { getSalonId, getSalonServices } from './api';

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
    const { userId } = this.props;
    const salonId = await getSalonId(userId);
    const salonServices = await getSalonServices(salonId);
    this.setState({ salonServices, loading: false });
  }

  handleEdit = service => {
    const { salon_service_id: salonServiceId } = service;
    const { history } = this.props;
    history.push({
      pathname: STYLIST_EDIT_SERVICE_URL,
      search: `${salonServiceId}`,
      state: { service },
    });
  };

  render() {
    const { salonServices, loading } = this.state;
    return (
      <div>
        {loading ? (
          <Loading />
        ) : salonServices.length ? (
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
        ) : (
          <p>No Services yet</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    login: {
      loggedUser: { userId },
    },
  } = state;
  return { userId };
};

export default connect(mapStateToProps)(withRouter(SalonServices));
