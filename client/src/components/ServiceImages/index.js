/* eslint-disable consistent-return, no-param-reassign  */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Upload, Icon, Modal } from 'antd';
import { Upload, Icon, message } from 'antd';

import axios from '../../axios-config';

import editServiceAction from '../../containers/Stylist/Services/EditService/editService.actions';
import addServiceAction from '../../containers/Stylist/Services/NewSalonService/newService.actions';

// ***********************
import { getSignedUrl, uploadFiles } from './api';

import './style.css';

function getBase64(img, cb) {
  const reader = new FileReader();
  reader.addEventListener('load', () => cb(reader.result));
  reader.readAsDataURL(img);
}

// ****************
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
    loading: false,
    imageUrl: null,
    blob: null,
    flag: false,
    images: [],
  };
  // state = {
  //   // imageUrl: '',
  //   // loading: false,
  //   fileList: [],
  //   // image: '',
  // };

  async componentDidMount() {
    const { status, editServiceAction: editService } = this.props;
    if (status === 'editService') {
      const serviceImages = [];
      const { salonServiceId } = this.props;
      const {
        data: { images },
      } = await axios.get(`/service/${salonServiceId}/images`);
      // console.log(999999999999, images);
      if (images && images.length) {
        await images.map(image => serviceImages.push(image.image));
        // console.log(666666, serviceImages);
        this.setState({ images: serviceImages });
      }
      editService({
        fieldName: 'serviceImage',
        value: serviceImages,
      });
    }
  }

  // handleCancel = () => this.setState({ previewVisible: false });

  // handlePreview = async file => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }

  //   this.setState({
  //     previewImage: file.url || file.preview,
  //     previewVisible: true,
  //   });
  // };

  // handleUpload = async ({ file }) => {
  //   const {
  //     editServiceAction: editService,
  //     addServiceAction: addService,
  //   } = this.props;
  //   const { status } = this.props;
  //   const link = await axios.post(`/upload/${2}`, {
  //     contentTypes: [file.type],
  //   });
  //   const {
  //     data: { promises },
  //   } = link;
  //   // console.log(77777777777, link);
  //   const mm = await axios.put(promises[0], file.blob, {
  //     headers: {
  //       'Content-Type': file.type,
  //     },
  //   });
  //   console.log(9999999999999, mm);
  //   if (status === 'editService') {
  //     return editService({
  //       fieldName: 'serviceImage',
  //       value: promises[0],
  //     });
  //   }
  //   return addService({
  //     fieldName: 'serviceImage',
  //     value: promises[0],
  //   });
  // };

  // ****************
  componentDidUpdate() {
    // console.log(7777777777, this.state);
    // const { flag, images } = this.state;
    // if(images !=== )
    const { images } = this.state;
  }

  // ********************
  handleChang = info => {
    // const { images, blob } = this.state;
    // console.log(22222, info.file.status);
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      // console.log(9999, 'loaaaad');
    }
    if (info.file.status === 'done') {
      // console.log(11111111111);
      getBase64(info.file.originFileObj, async imageUrl => {
        // console.log(5555555555555, info.file);
        const uploadedImage = await getSignedUrl(2, info.file.type);
        const {
          data: { promises },
        } = uploadedImage;
        // console.log(1111111111, blob);
        const ui = await uploadFiles(promises, info.file.originFileObj);
        // console.log(22222222222, ui);
        this.setState({
          // images: images.concat(imageUrl),
          // blob: info.file.originFileObj,
          loading: false,
        });
      });
    }
  };

  render() {
    const { loading, images } = this.state;
    console.log(9999121, images);

    return (
      <div className="clearfix">
        <Upload
          onChange={this.handleChang}
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
          {// images &&
          images.length &&
            images.map(image => (
              <>
                {console.log('ooooooooooooooooor', image)}
                <img src={image} alt="avatar" style={{ width: '100%' }} />
              </>
            ))
          // <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
          }
          {/* <uploadButton /> */}
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
