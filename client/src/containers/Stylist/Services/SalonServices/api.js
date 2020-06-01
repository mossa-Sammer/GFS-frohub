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

export { getSalonServices, getSalonService };
