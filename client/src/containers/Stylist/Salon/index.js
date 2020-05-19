import React, { Component } from 'react';
import { Button, Form, Input, Radio, Upload, Icon, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import { STYLIST_SERVICES_URL } from '../../../routes_urls';
import { Image } from '../../../components';

import './style.css';

class SalonForm extends Component {
  state = {
    profileImage: {
      imageUrl: '',
      modalVisible: false,
    },
    coverImage: {
      imageUrl: '',
      modalVisible: false,
    },
    profileModalVisible: false,
    coverModalVisible: false,
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  onClick = e => {
    const { name } = e.target;
    const { state } = this;
    if (name === 'coverImage') {
      this.setState({ coverModalVisible: true });
    }
    if (name === 'profileImage') this.setState({ profileModalVisible: true });

    // const image = state[name];

    // this.setState({
    //   [name]: {
    //     ...image,
    //     modalVisible: true,
    //   },
    // });
  };

  onCancel = () => {
    const { profileModalVisible, coverModalVisible } = this.state;
    if (profileModalVisible) this.setState({ profileModalVisible: false });
    else this.setState({ coverModalVisible: false });
  };

  hanldeImageDelete = e => {
    const { name } = e.target;
    const { state } = this;
    const data = state[name];

    this.setState({
      [name]: {
        ...data,
        imageUrl: '',
      },
      profileModalVisible: false,
      // coverModalVisible: false,
    });
  };

  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  handleFileChange = info => {
    const lastFile = info.fileList[info.fileList.length - 1];
    console.log('last file is ', lastFile);
    const { profileImage } = this.state;
    this.setState({
      profileImage: {
        ...profileImage,
        imageUrl: lastFile,
      },
    });

    console.log('status', info.file.status);
    // if (info.file.status === 'uploading') {
    // this.setState({ loading: true, imageUrl: lastFile });

    // return;
    // }
    // if (info.file.status === 'done') {
    console.log('done');
    // Get this url from response in real world.
    this.getBase64(info.file.originFileObj, imageUrl => {
      console.log('res', imageUrl);
      this.setState({
        profileImage: {
          ...profileImage,
          imageUrl,
          loading: false,
        },
      });
    });
    // }
  };

  // closeModal = e => {
  //   console.log(11111111, e.target);
  // };

  render() {
    const {
      profileImage: { imageUrl },
      profileModalVisible,
      coverModalVisible,
    } = this.state;
    console.log(imageUrl);
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return (
      <div>
        <div>Salon Details</div>
        <Form>
          <Form.Item label="Salon name">
            <Input />
          </Form.Item>
          <Form.Item label="About me">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item className="profile-image__input" label="Profile image">
            {imageUrl ? (
              <Image
                name="profileImage"
                onClick={this.onClick}
                src={imageUrl}
                visible={profileModalVisible}
                onCancel={this.onCancel}
                handleDelete={this.hanldeImageDelete}
              />
            ) : (
              <Upload.Dragger
                className="avatar-uploader"
                listType="picture-card"
                fileList={[]}
                name="avatar"
                accept="image/jpg"
                beforeUpload={this.beforeUpload}
                onChange={this.handleFileChange}
                customRequest={({ file, onSuccess }) => {
                  console.log(file.path);
                  setTimeout(() => {
                    onSuccess('ok');
                  }, 0);
                }}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            )}
          </Form.Item>
          {/* <Form.Item label="Cover image">
            <ImageDrager />
          </Form.Item> */}
          <Radio.Group>
            <Radio style={radioStyle} value="salon">
              Salon based
            </Radio>
            <Radio style={radioStyle} value="home">
              Home based
            </Radio>
            <Radio style={radioStyle} value="mobile">
              Mobile based
            </Radio>
          </Radio.Group>
          <p>
            if you have any formal qualifications as Hairstylist/Beautian,
            please upload them here
          </p>
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button>
              <Icon type="upload" /> Click to upload a document
            </Button>
          </Upload>
        </Form>
        <Button>
          <Link to={STYLIST_SERVICES_URL}>Next</Link>
        </Button>
      </div>
    );
  }
}

export default withRouter(SalonForm);
