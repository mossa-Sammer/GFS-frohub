import axios from 'axios';

// treatments actions types
export const TREATMENT_INPUT_LOADING = 'TREATMENT_INPUT_LOADING';
export const TREATMENT_INPUT_LIST = 'TREATMENT_INPUT_LIST';
export const TREATMENT_INPUT_ERROR = 'TREATMENT_INPUT_ERROR';

export default () => async dispatch => {
  try {
    dispatch({
      type: TREATMENT_INPUT_LOADING,
    });
    // api of treatments
    const treatments = await axios.get('/api/treatments');
    dispatch({
      type: TREATMENT_INPUT_LIST,
      payload: treatments.data,
    });
  } catch (err) {
    dispatch({
      type: TREATMENT_INPUT_ERROR,
      payload: err,
    });
  }
};
