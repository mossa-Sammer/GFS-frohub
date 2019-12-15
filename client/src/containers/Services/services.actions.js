import axios from 'axios';

import { filterServices as filterServicesUtil } from './utils';
import { advancedSearch as sortServicesUtil } from './utils/sort-services';

export const SERVICES_LOADING = 'SERVICES_LOADING';
export const SERVICES_LIST = 'SERVICES_LIST';
export const SERVICES_FILTER = 'SERVICES_FILTER';
export const SERVICES_ERROR = 'SERVICES_ERROR';
export const SERVICES_SORT = 'SERVICES_SORT';

export default fieldsValues => async dispatch => {
  try {
    dispatch({
      type: SERVICES_LOADING,
    });
    const { data: services } = await axios.get(
      'https://frohub.com/wp-json/wc-bookings/v1/products?per_page=100'
    );
    const filtredServices = filterServicesUtil(services, fieldsValues);
    dispatch({
      type: SERVICES_LIST,
      payload: { services, filtredServices },
    });
  } catch (err) {
    dispatch({
      type: SERVICES_ERROR,
      payload: err,
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

export const sortServices = (services, field) => {
  // filter function
  const sortedServices = sortServicesUtil(services, field);
  // const sortedServices = services;
  return {
    type: SERVICES_SORT,
    payload: sortedServices,
  };
};
