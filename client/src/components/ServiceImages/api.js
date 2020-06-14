import generalAxios from 'axios';
import axios from '../../axios-config';

const getSignedUrl = (userId, type) => {
  return axios.post(`/upload/${userId}`, {
    contentTypes: [type],
  });
};

const uploadFiles = (urls, files) => {
  console.log(555555, files);
  urls.map(async (url, index) => {
    // console.log(1111, url, 999, files[index]);
    const rr = await generalAxios.put(url, files[index], {
      headers: {
        'Content-Type': files.type,
      },
    });
    console.log(3333, rr);
  });
};

export { getSignedUrl, uploadFiles };
