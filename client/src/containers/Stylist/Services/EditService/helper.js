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
      status,
      images,
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
    service.images = images;
    if (status === 'edit') {
      service.images = images;
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
    }
    const newService = await axios.post(`/salon/${salonId}/service`, service);
    if (newService.status === 200) {
      return {
        err: false,
        errMsg: '',
        success: true,
        successMsg: 'Added Successfully',
      };
    }
  } catch (err) {
    let errMsg = '';
    const { error } = err.response.data;

    if (!error) errMsg = err.response.data.message;
    else errMsg = error.message;

    return {
      err: true,
      errMsg,
      success: false,
      successMsg: '',
    };
  }
};

export default editService;
