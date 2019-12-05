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
      const { data: locationList } = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&limit=10&countrycodes=gb&q=${query}`
      );
      dispatch({
        type: LOCATION_INPUT_LIST,
        payload: locationList,
      });
    } catch (err) {
      dispatch({
        type: LOCATION_INPUT_ERROR,
        payload: err,
      });
    }
  };
};
