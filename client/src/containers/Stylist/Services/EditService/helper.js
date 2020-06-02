import axios from '../../../../axios-config';

const editService = async fields => {
  const service = {};
  try {
    const {
      serviceName,
      serviceNewName,
      serviceLength,
      serviceNewLength,
      price,
    } = fields;
    service.price = price;
    if (serviceNewName) {
      const {
        data: { name },
      } = await axios.post('/service', {
        name: serviceNewName,
      });
      service.service = name;
    } else {
      service.service = serviceName;
    }
    if (serviceNewLength) {
      const { data: length } = await axios.post('/service/length', {
        name: serviceNewLength,
      });
      const { name: serviceLengthName } = length;
      service.length = serviceLengthName;
    } else {
      service.length = serviceLength;
    }
    return {
      err: false,
      errMsg: '',
    };
  } catch (err) {
    const { error } = err.response.data;
    const { message } = error;
    return {
      err: true,
      errMsg: message,
    };
  }
};

export default editService;
