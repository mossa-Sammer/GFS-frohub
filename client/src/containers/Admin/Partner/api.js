import axios from '../../../axios-config';

const getUserPersonal = async userId => {
  try {
    const { data } = await axios.get(`/user/${userId}/personal`);
    const keys = Object.keys(data);
    if (keys.length) {
      return { isUser: true, data };
    }
    return {
      data: {},
      isUser: false,
    };
  } catch (err) {
    return err;
  }
};

export default getUserPersonal;
