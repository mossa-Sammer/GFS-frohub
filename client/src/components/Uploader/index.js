/* eslint-disable react/no-unused-state */
import React from 'react';
import { Upload, Icon, message } from 'antd';

import './style.css';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
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

class Uploader extends React.Component {
  state = {
    loading: false,
    imageUrl: null,
    blob: null,
    flag: false,
  };

  componentDidMount() {
    const { imgUrl } = this.props;
    this.setState({ imageUrl: imgUrl });
  }

  componentDidUpdate() {
    const { imgUrl } = this.props;
    const { imageUrl, flag } = this.state;
    if (imageUrl !== imgUrl) {
      if (flag) return;
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ imageUrl: imgUrl, flag: true });
    }
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          blob: info.file.originFileObj,
          loading: false,
        });
      });
    }
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Click to Upload</div>
      </div>
    );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        // eslint-disable-next-line no-unused-vars
        customRequest={({ _file, onSuccess }) => {
          setTimeout(() => {
            onSuccess('ok');
          }, 0);
        }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}

export default Uploader;
