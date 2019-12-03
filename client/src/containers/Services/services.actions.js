import axios from 'axios';

import { filterServices as filterServicesUtil } from './utils';

export const SERVICES_LOADING = 'SERVICES_LOADING';
export const SERVICES_LIST = 'SERVICES_LIST';
export const SERVICES_FILTER = 'SERVICES_FILTER';
export const SERVICES_ERROR = 'SERVICES_ERROR';
// eslint-disable-next-line no-unused-vars
export default fieldsValues => async dispatch => {
  try {
    dispatch({
      type: SERVICES_LOADING,
    });
    const services = await axios.get('SERVICES API');
    const filtredServices = filterServicesUtil(services, fieldsValues);
    dispatch({
      type: SERVICES_LIST,
      payload: { services, filtredServices },
    });
  } catch (err) {
    const { error } = err.response.data;
    dispatch({
      type: SERVICES_ERROR,
      payload: error,
    });
  }
};

export const filterServices = (services, fields) => {
  const filtredServices = filterServicesUtil(services, fields);
  return {
    type: SERVICES_FILTER,
    payload: filtredServices,
  };
};
