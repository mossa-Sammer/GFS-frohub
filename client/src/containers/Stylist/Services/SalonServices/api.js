import axios from '../../../../axios-config';

const getSalonServices = async id => {
  const {
    data: { salonServices },
  } = await axios.get(`/salon/${id}/services`);
  return salonServices;
};

const getSalonService = async id => {
  const {
    data: { service: data },
  } = await axios.get(`/service/${id}`);
  return data[0];
};

const getServicesLengthes = async () => {
  const {
    data: { servicesLengthes: data },
  } = await axios.get('/services/lengthes');
  return data;
};

const getSalonServiceLength = async id => {
  const {
    data: { serviceLength: data },
  } = await axios.get(`/service/${id}/length/`);
  return data;
};

export {
  getSalonServices,
  getSalonService,
  getServicesLengthes,
  getSalonServiceLength,
};
