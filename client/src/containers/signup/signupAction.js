import axios from '../../axios-config';
import { AUTHENTICANTE_SUCCESS } from '../../auth/auth.action';

export const SIGNUP_LOADING = 'SIGNUP_LOADING';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const RESET_SIGNUP_ERROR = 'RESET_SIGNUP_ERROR';

export const signupUser = user => {
  return async dispatch => {
    try {
      dispatch({
        type: SIGNUP_LOADING,
      });
      await axios.post('/signup', user);
      dispatch({
        type: AUTHENTICANTE_SUCCESS,
      });
    } catch (err) {
      const { error } = err.response.data;
      dispatch({
        type: SIGNUP_FAIL,
        payload: {
          data: '',
          error,
        },
      });
    }
  };
};

export const resetErrAction = field => {
  return {
    type: RESET_SIGNUP_ERROR,
    payload: field,
  };
};
