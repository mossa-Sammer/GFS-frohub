import axios from 'axios';

import { filterServices as filterServicesUtil } from './utils';
import { advancedSearch as sortServicesUtil } from './utils/sort-services';

export const SERVICES_LOADING = 'SERVICES_LOADING';
export const SERVICES_STORES = 'SERVICES_STORES';
export const SERVICES_LIST = 'SERVICES_LIST';
export const SERVICES_FILTER = 'SERVICES_FILTER';
export const SERVICES_ERROR = 'SERVICES_ERROR';
export const SERVICES_SORT = 'SERVICES_SORT';

export default fieldsValues => async dispatch => {
  try {
    dispatch({
      type: SERVICES_LOADING,
    });
    const { data: stores } = await axios.get(
      'https://frohub.com/wp-json/dokan/v1/stores/'
    );
    dispatch({
      type: SERVICES_STORES,
      payload: stores,
    });
    const { data: services } = await axios.get(
      'https://frohub.com/wp-json/wc-bookings/v1/products?per_page=100'
    );
    const filtredServices = filterServicesUtil(stores, services, fieldsValues);
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

export const filterServices = (stores, services, fields) => {
  const filtredServices = filterServicesUtil(stores, services, fields);
  return {
    type: SERVICES_FILTER,
    payload: filtredServices,
  };
};

export const sortServices = (stores, services, field) => {
  const sortedServices = sortServicesUtil(stores, services, field);
  return {
    type: SERVICES_SORT,
    payload: sortedServices,
  };
};
