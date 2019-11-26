import axios from '../../axios-config';

import { AUTHENTICANTE_SUCCESS } from '../../auth/auth.action';

export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export default data => async dispatch => {
  dispatch({
    type: LOGIN_LOADING,
  });

  try {
    await axios.post('/login', data);
    dispatch({
      type: AUTHENTICANTE_SUCCESS,
    });
  } catch (err) {
    const { error } = err.response.data;
    const errorField = error.message.split(' ')[0];
    dispatch({
      type: LOGIN_ERROR,
      payload: { [errorField]: error.message },
    });
  }
};
