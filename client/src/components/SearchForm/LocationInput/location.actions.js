import axios from 'axios';

// action types
export const LOCATION_INPUT_LOADING = 'LOCATION_INPUT_LOADING';
export const LOCATION_INPUT_LIST = 'LOCATION_INPUT_LIST';
export const LOCATION_INPUT_ERROR = 'LOCATION_INPUT_ERROR';

export const fetchLocationList = query => {
  return async dispatch => {
    try {
      dispatch({
        type: LOCATION_INPUT_LOADING,
      });
      // fetch list of locations from open street map
      const locationList = await axios.get(`<LINKTOTHEAPI>?q=${query}`);
      dispatch({
        type: LOCATION_INPUT_LIST,
        payload: locationList,
      });
    } catch (err) {
      const { error } = err.response.data;
      dispatch({
        type: LOCATION_INPUT_ERROR,
        payload: error,
      });
    }
  };
};
