import signupHttp from './api';
import { LOADING, SIGN_UP } from './types';

const signupUser = user => {
  return async dispatch => {
    try {
      dispatch({
        type: LOADING,
      });
      const createdUser = await signupHttp(user);
      if (createdUser.data) {
        localStorage.setItem('frohubUser', JSON.stringify(createdUser.data));
      }
      dispatch({
        type: SIGN_UP,
        payload: createdUser,
      });
    } catch (error) {
      dispatch({
        type: SIGN_UP,
        payload: {
          data: '',
          error,
        },
      });
    }
  };
};

export default signupUser;
