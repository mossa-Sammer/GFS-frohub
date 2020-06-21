import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Upload, Icon } from 'antd';

import editServiceAction from '../../containers/Stylist/Services/EditService/editService.actions';
import addServiceAction from '../../containers/Stylist/Services/NewSalonService/newService.actions';

import beforeUpload from './helper/beforeUpload';
import getBase64 from './helper/getBase64';

import { getSignedUrl, uploadFiles } from './api';

import './style.css';

class ServiceImageUploader extends Component {
  state = {
    images: [],
    loading: false,
  };

  handleChange = info => {
    const { images } = this.state;
    const {
      status,
      editServiceAction: editService,
      addServiceAction: addService,
    } = this.props;
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, async () => {
        const uploadedImage = await getSignedUrl(2, info.file.type);
        const {
          data: { images: serviceImages, promises },
        } = uploadedImage;
        await uploadFiles(promises[0], info.file.originFileObj);

        this.setState({
          images: images.concat(serviceImages[0]),
          loading: false,
        });
        if (status === 'editService')
          return editService({
            fieldName: 'serviceImage',
            value: serviceImages,
            status: 'edit',
          });
        return addService({
          fieldName: 'serviceImage',
          value: images,
        });
      });
    }
  };

  render() {
    const { loading, images } = this.state;
    const { length } = this.props;
    return (
      <div className="service__images-container">
        <div className="service__image-container">
          {!images.length
            ? null
            : images.map(img => (
                <img src={img} className="service__image" alt="servcie" />
              ))}
          {length >= 3 ? null : (
            <Upload
              onChange={this.handleChange}
              customRequest={({ _file, onSuccess }) => {
                setTimeout(() => {
                  onSuccess('ok');
                }, 0);
              }}
              beforeUpload={beforeUpload}
              listType="picture-card"
              showUploadList={false}
              className="service__images-upload"
            >
              <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
              </div>
            </Upload>
          )}
        </div>
      </div>
    );
  }
}

export default connect(null, { editServiceAction, addServiceAction })(
  ServiceImageUploader
);
