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
    // console.log(1111111, treatments.data);
    dispatch({
      type: TREATMENT_INPUT_LIST,
      payload: treatments.data,
    });
  } catch (err) {
    // const { error } = err.response.data;
    dispatch({
      type: TREATMENT_INPUT_ERROR,
      payload: err,
    });
  }
};
