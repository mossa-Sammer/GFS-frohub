import axios from '../../../axios-config';

const getBusinessDetails = async id => {
  const business = await axios.get(`/stylist/${id}/business`);
  if (business.status !== 200)
    return {
      err: true,
      errMsg: 'Unauthorized',
    };
  const stylistBusiness = {
    accountNumber: '',
    sortCode: '',
    preferredPayMethod: '',
  };
  const { data } = business.data;
  if (!data.length)
    return {
      hasBusiness: false,
      stylistBusiness,
    };
  const stylistBus = data[0];
  return {
    hasBusiness: true,
    accountNumber: stylistBus.account_number,
    sortCode: stylistBus.sort_code,
    preferredPayMethod: stylistBus.preferred_pay_method,
  };
};

const postBusinessDetails = async (id, business) => {
  try {
    await axios.post(`/stylist/${id}/business`, business);
    return {
      err: false,
    };
  } catch (err) {
    return {
      err: true,
      error: err.response.data,
    };
  }
};

const updateBusinessDetails = async (id, business) => {
  try {
    await axios.patch(`/stylist/${id}/business`, business);
    return {
      err: false,
    };
  } catch (err) {
    return {
      err: true,
      error: err.response.data,
    };
  }
};

const getFinance = async id => {
  const {
    data: { stylistFinance },
  } = await axios.get(`/stylist/${id}/finance`);

  if (!stylistFinance.length)
    return {
      hasFinance: false,
      stylistFinance: [],
    };
  return {
    hasFinance: true,
    stylistFinance,
  };
};

export {
  getBusinessDetails,
  postBusinessDetails,
  updateBusinessDetails,
  getFinance,
};
