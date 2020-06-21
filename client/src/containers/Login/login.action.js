import axios from '../../axios-config';

import { AUTHENTICANTE_SUCCESS } from '../../auth/auth.action';

export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export default data => async dispatch => {
  dispatch({
    type: LOGIN_LOADING,
  });

  try {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { loggedUser: storedUser },
      });
    } else {
      const { data: user } = await axios.post('/login', data);
      const { data: loggedUser } = user;
      localStorage.setItem('user', JSON.stringify(loggedUser));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { loggedUser },
      });
      dispatch({
        type: AUTHENTICANTE_SUCCESS,
      });
    }
  } catch (err) {
    const { error } = err.response.data;
    const errorField = error.message.split(' ')[0];
    dispatch({
      type: LOGIN_ERROR,
      payload: { [errorField]: error.message },
    });
  }
};
