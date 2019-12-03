import axios from 'axios';

export const LOADING_SEARCH_RESULTS = 'LOADING_SEARCH_RESULTS';
export const GET_SERVICES = 'GET_SERVICES';
export const FILTER_SERVICES = 'FILTER_SERVICES';
export const SEARCH_ERROR = 'SEARCH_ERROR';

// eslint-disable-next-line no-unused-vars
export default fieldsValues => async dispatch => {
  try {
    dispatch({
      type: LOADING_SEARCH_RESULTS,
    });
    const services = axios.get('SERVICES API');
    dispatch({
      type: GET_SERVICES,
      payload: services,
    });
    dispatch({
      type: FILTER_SERVICES,
      // payload: filter on services by fieldsValues
      payload: services,
    });
  } catch (err) {
    const { error } = err.response.data;
    dispatch({
      type: SEARCH_ERROR,
      payload: error,
    });
  }
};
