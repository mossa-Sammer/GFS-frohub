import axios from '../../../../axios-config';

const editService = async fields => {
  const service = {};
  const { serviceName, serviceNewName } = fields;
  if (serviceNewName) {
    const {
      data: { name },
    } = await axios.post('/service', {
      name: serviceNewName,
    });
    service.serviceId = name;
  } else {
    service.serviceId = serviceName;
  }
  return service;
};

export default editService;
