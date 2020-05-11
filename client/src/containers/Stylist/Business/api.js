import axios from '../../../axios-config';

const getBusinessDetails = async (id = 4) => {
  const business = await axios.get(`/stylist/${id}/business`);
  if (business.status !== 200)
    return {
      err: true,
      errMsg: 'Unauthorized',
    };
  const stylistBusiness = {
    fullName: '',
    accountNumber: '',
    sortCode: '',
    preferredPayMethod: '',
  };
  const { data } = business.data;
  if (!data.length) return stylistBusiness;
  const stylistBus = data[0];
  return {
    fullName: stylistBus.full_name,
    accountNumber: stylistBus.account_number,
    sortCode: stylistBus.sort_code,
    preferredPayMethod: stylistBus.preferred_pay_method,
  };
};

const postBusinessDetails = async business => {
  const id = 4;
  await axios.patch(`/stylist/${id}/business`, business);
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

export { getBusinessDetails, postBusinessDetails, getFinance };
