import signupHttp from './api';
import { LOADING, SIGN_UP } from './types';

const signupUser = user => {
  return async dispatch => {
    try {
      dispatch({
        type: LOADING,
      });
      const createdUser = await signupHttp(user);
      // console.log(99999, createdUser.data)
      // console.log(99999, createdUser.err)
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
