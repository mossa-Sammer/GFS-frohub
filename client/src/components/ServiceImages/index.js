/* eslint-disable consistent-return, no-param-reassign  */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Upload, Icon, Modal } from 'antd';
import axios from '../../axios-config';

import editServiceAction from '../../containers/Stylist/Services/EditService/editService.actions';
import addServiceAction from '../../containers/Stylist/Services/NewSalonService/newService.actions';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// const fileList = [
//   {
//     uid: '-1',
//     name: 'image.png',
//     status: 'done',
//     url: 'https://go.aws/2XFQXt6',
//   },
//   {
//     uid: '-2',
//     name: 'image.png',
//     status: 'done',
//     url: 'https://go.aws/2XFxk4k',
//   },
// ];

class ServiceImages extends Component {
  state = {
    // imageUrl: '',
    // loading: false,
    fileList: [],
    // image: '',
  };

  async componentDidMount() {
    const { status, editServiceAction: editService } = this.props;
    if (status === 'editService') {
      const { salonServiceId } = this.props;
      const {
        data: { images },
      } = await axios.get(`/service/${salonServiceId}/images`);
      // this.setState({ fileList: images });
      editService({
        fieldName: 'serviceImage',
        value: images,
      });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleUpload = async ({ file }) => {
    const {
      editServiceAction: editService,
      addServiceAction: addService,
    } = this.props;
    const { status } = this.props;
    const link = await axios.post(`/upload/${2}`, {
      contentTypes: [file.type],
    });
    const {
      data: { images },
    } = link;
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
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          customRequest={this.handleUpload}
        >
          {uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default connect(null, { editServiceAction, addServiceAction })(
  ServiceImages
);
