import axios from 'axios';

// treatments actions types
export const TREATMENT_INPUT_LOADING = 'TREATMENT_INPUT_LOADING';
export const TREATMENT_INPUT_LIST = 'TREATMENT_INPUT_LIST';
export const TREATMENT_INPUT_ERROR = 'TREATMENT_INPUT_ERROR';

export default treatment => async dispatch => {
  try {
    dispatch({
      type: TREATMENT_INPUT_LOADING,
    });
    // api of treatments
    const treatments = axios.get(`fetch treatments api ${treatment}`);
    dispatch({
      type: TREATMENT_INPUT_LIST,
      payload: treatments,
    });
  } catch (err) {
    const { error } = err.response.data;
    dispatch({
      type: TREATMENT_INPUT_ERROR,
      payload: error,
    });
  }
};
