import axios from '../../../../axios-config';

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
    paymentmethod: '',
  };
  const { data } = business.data;
  if (!data.length) return stylistBusiness;
  const stylistBus = data[0];
  return {
    fullName: stylistBus.full_name,
    accountNumber: stylistBus.account_number,
    sortCode: stylistBus.sort_code,
    paymentmethod: stylistBus.preferred_pay_method,
  };
};

export { getBusinessDetails };
