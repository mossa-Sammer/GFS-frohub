import axios from '../../axios-config';

const getSignedUrl = (userId, type) => {
  return axios.post(`/upload/${userId}`, {
    contentTypes: [type],
  });
};

// const uploadFiles = (urls, files) => {
//   return urls.map((url, index) => {
//     return axios.put(url, files[index], {
//       headers: {
//         'Content-Type': files[index].type,
//       },
//     });
//   });
// };

export {
  getSignedUrl,
  // uploadFiles
};
