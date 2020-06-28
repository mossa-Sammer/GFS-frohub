import axios from '../../../axios-config';

const getAllPartners = async () => {
  try {
    const { data } = await axios.get('/admin/users');
    return data;
  } catch (err) {
    return err;
  }
};

export default getAllPartners;
