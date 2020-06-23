/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { message } from 'antd';

import Loading from '../Loading';

import ServiceImagesAction from './services.images.actions';
import editServiceAction from '../../containers/Stylist/Services/EditService/editService.actions';

import './style.css';

class ServicesImages extends Component {
  async componentDidMount() {
    const { salonServiceId, ServiceImagesAction: serviceImages } = this.props;
    serviceImages(salonServiceId);
  }

  render() {
    const {
      serviceImages: { loading, images, imagesLength, err },
    } = this.props;
    return (
      <div>
        {err && message.error('Ooops! Something went error, Please try again.')}
        {loading ? (
          <Loading />
        ) : imagesLength ? (
          <div className="service__images-container">
            {images.map(image => (
              <div className="service__image-container">
                <img
                  className="service__image"
                  src={image.image}
                  alt="service"
                />
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { serviceImages } = state;
  return {
    serviceImages,
  };
};

export default connect(mapStateToProps, {
  ServiceImagesAction,
  editServiceAction,
})(ServicesImages);
