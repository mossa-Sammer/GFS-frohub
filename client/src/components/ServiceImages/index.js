/* eslint-disable consistent-return, no-param-reassign  */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Upload, Icon, message } from 'antd';

import axios from '../../axios-config';

import editServiceAction from '../../containers/Stylist/Services/EditService/editService.actions';
import addServiceAction from '../../containers/Stylist/Services/NewSalonService/newService.actions';

import { getSignedUrl, uploadFiles } from './api';

import './style.css';

function getBase64(img, cb) {
  const reader = new FileReader();
  reader.addEventListener('load', () => cb(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class ServiceImages extends Component {
  state = {
    loading: false,
    images: [],
  };

  async componentDidMount() {
    const { status, editServiceAction: editService } = this.props;
    if (status === 'editService') {
      const serviceImages = [];
      const { salonServiceId } = this.props;
      const {
        data: { images },
      } = await axios.get(`/service/${salonServiceId}/images`);
      if (images && images.length) {
        await images.map(image => serviceImages.push(image.image));
        this.setState({ images: serviceImages });
      }
      editService({
        fieldName: 'serviceImage',
        value: serviceImages,
      });
    }
  }

  componentDidUpdate() {
    const {
      status,
      editServiceAction: editService,
      addServiceAction: addService,
    } = this.props;
    const { images } = this.state;
    if (status === 'editService') {
      return editService({
        fieldName: 'serviceImage',
        value: images,
      });
    }
    return addService({
      fieldName: 'serviceImage',
      value: images,
    });
  }

  handleChange = info => {
    const { images } = this.state;
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, async () => {
        const uploadedImage = await getSignedUrl(2, info.file.type);
        const {
          data: { images: serviceImages, promises },
        } = uploadedImage;

        await uploadFiles(promises, info.file.originFileObj);
        this.setState({
          images: images.concat(serviceImages[0]),
          loading: false,
        });
      });
    }
  };

  render() {
    const { loading, images } = this.state;

    return (
      <div className="clearfix">
        {images.length &&
          images.map(image => (
            <div className="service_img-box">
              <img
                className="service_img"
                src={image}
                alt="avatar"
                style={{ width: '100%' }}
              />
            </div>
          ))}
        <Upload
          onChange={this.handleChange}
          customRequest={({ _file, onSuccess }) => {
            setTimeout(() => {
              onSuccess('ok');
            }, 0);
          }}
          beforeUpload={beforeUpload}
          listType="picture-card"
          // showUploadList={false}
          className="service__images-upload"
        >
          <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Click to Upload</div>
          </div>
        </Upload>
      </div>
    );
    // const { previewVisible, previewImage, fileList } = this.state;
    // const uploadButton = (
    //   <div>
    //     <Icon type="plus" />
    //     <div className="ant-upload-text">Upload</div>
    //   </div>
    // );
    // return (
    //   <div className="clearfix">
    //     <Upload
    //       listType="picture-card"
    //       fileList={fileList}
    //       onPreview={this.handlePreview}
    //       customRequest={this.handleUpload}
    //     >
    //       {uploadButton}
    //     </Upload>
    //     <Modal
    //       visible={previewVisible}
    //       footer={null}
    //       onCancel={this.handleCancel}
    //     >
    //       <img alt="example" style={{ width: '100%' }} src={previewImage} />
    //     </Modal>
    //   </div>
    // );
  }
}

export default connect(null, { editServiceAction, addServiceAction })(
  ServiceImages
);
