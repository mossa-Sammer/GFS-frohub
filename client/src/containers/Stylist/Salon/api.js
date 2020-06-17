import axios from 'axios';

// get signedUrl

const getSignedUrl = (userId, types) => {
  return axios.post(`/api/upload/${userId}`, {
    contentTypes: types,
  });
};

const uploadFiles = (urls, files) => {
  return urls.map((url, index) => {
    return axios.put(url, files[index], {
      headers: {
        'Content-Type': files[index].type,
      },
    });
  });
};

const addSalon = (userId, salon, openingTimes, zones) => {
  return axios.post(`/api/salon/${userId}`, {
    salon,
    openingTimes,
    zones,
  });
};

const updateSalon = (salonId, salon, openingTimes, zones) => {
  return axios.patch(`/api/salon/${salonId}`, {
    salon,
    openingTimes,
    zones,
  });
};

export { getSignedUrl, uploadFiles, addSalon, updateSalon };
