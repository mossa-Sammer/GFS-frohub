import axios from '../../../axios-config';

const getUserPersonal = async userId => {
  try {
    const { data } = await axios.get(`/user/${userId}/personal`);
    return data;
  } catch (err) {
    return err;
  }
};

export default getUserPersonal;
