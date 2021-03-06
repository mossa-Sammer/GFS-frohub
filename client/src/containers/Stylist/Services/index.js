import React, { Component } from 'react';
import { Button } from 'antd';

import SalonServices from './SalonServices';

import { STYLIST_NEW_SERVICE_URL } from '../../../routes_urls';

import './style.css';

export default class StylistServices extends Component {
  handleNewService = () => {
    const { history } = this.props;
    history.push(STYLIST_NEW_SERVICE_URL);
  };

  render() {
    return (
      <div className="salon__services-container">
        <h1>Your Services</h1>
        <div className="services__form">
          <div className="services__form-new">
            <Button
              className="new__service-btn"
              onClick={this.handleNewService}
            >
              Add New Service
            </Button>
          </div>
          <div className="services__form-edit">
            <SalonServices />
          </div>
        </div>
      </div>
    );
  }
}
