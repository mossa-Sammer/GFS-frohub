import axios from 'axios';
import APIAxios from '../../../axios-config';

const getSignedUrl = (userId, types) => {
  return APIAxios.post(`/upload/${userId}`, {
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
  return APIAxios.post(`/salon/${userId}`, {
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
