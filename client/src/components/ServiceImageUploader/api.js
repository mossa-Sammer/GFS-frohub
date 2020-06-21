import generalAxios from 'axios';
import axios from '../../axios-config';

const getSignedUrl = (userId, type) => {
  return axios.post(`/upload/${userId}`, {
    contentTypes: [type],
  });
};

const uploadFiles = async (url, file) => {
  await generalAxios.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};

export { getSignedUrl, uploadFiles };
