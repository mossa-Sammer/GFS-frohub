import generalAxios from 'axios';
import axios from '../../axios-config';

const getSignedUrl = (userId, type) => {
  return axios.post(`/upload/${userId}`, {
    contentTypes: [type],
  });
};

const uploadFiles = (urls, files) => {
  urls.map(async (url, index) => {
    await generalAxios.put(url, files[index], {
      headers: {
        'Content-Type': files.type,
      },
    });
  });
};

export { getSignedUrl, uploadFiles };
