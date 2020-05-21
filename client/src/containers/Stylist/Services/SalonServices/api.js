import axios from '../../../../axios-config';

const getSalonServices = async id => {
  const {
    data: { salonServices },
  } = await axios.get(`/salon/${id}/services`);
  return salonServices;
};

export default getSalonServices;
