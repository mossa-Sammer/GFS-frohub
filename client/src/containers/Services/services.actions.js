import axios from 'axios';
import moment from 'moment';

import { filterServices as filterServicesUtil } from './utils';
import { advancedSearch as sortServicesUtil } from './utils/sort-services';

export const SERVICES_LOADING = 'SERVICES_LOADING';
export const SERVICES_STORES = 'SERVICES_STORES';
export const SERVICES_LIST = 'SERVICES_LIST';
export const SERVICES_FILTER = 'SERVICES_FILTER';
export const SERVICES_ERROR = 'SERVICES_ERROR';
export const SERVICES_SORT = 'SERVICES_SORT';

const maxDate = moment()
  .add(6, 'months')
  .format('DD/MM/YYYY');

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
    const { data: slots } = await axios.get(
      `https://frohub.com//wp-json/wc-bookings/v1/products/slots?max_date=${maxDate}`
    );
    const filtredServices = filterServicesUtil(stores, services, fieldsValues);
    dispatch({
      type: SERVICES_LIST,
      payload: { services, filtredServices, slots: slots.records },
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

export const sortServices = (services, field) => {
  const sortedServices = sortServicesUtil(services, field);
  return {
    type: SERVICES_SORT,
    payload: sortedServices,
  };
};
