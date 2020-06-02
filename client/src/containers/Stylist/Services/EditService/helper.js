import axios from '../../../../axios-config';

const editService = async fields => {
  const service = {};
  try {
    const {
      salonId,
      salonServiceId,
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
    service.images = ['https://go.aws/2MnYmGY'];
    const updatedService = await axios.patch(
      `/salon/${salonId}/service/${salonServiceId}`,
      service
    );
    if (updatedService.status === 200) {
      return {
        err: false,
        errMsg: '',
        success: true,
        successMsg: 'Updated Successfully',
      };
    }
  } catch (err) {
    const { error } = err.response.data;
    const { message } = error;
    return {
      err: true,
      errMsg: message,
      success: false,
      successMsg: '',
    };
  }
};

export default editService;
