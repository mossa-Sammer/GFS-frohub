import axios from '../../axios-config';

const getAllServices = async () => {
  const {
    data: { services: data },
  } = await axios.get('/services');
  return data;
};

export default getAllServices;
