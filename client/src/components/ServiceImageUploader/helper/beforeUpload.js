import { message } from 'antd';

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Please upload an image smaller than 2 MB.');
  }
  return isJpgOrPng && isLt2M;
}

export default beforeUpload;
