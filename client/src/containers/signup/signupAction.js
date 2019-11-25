import signupHttp from './api';

export const SIGN_UP_LOADING = 'SIGN_UP_LOADING';
export const AUTHENTICATED_SUCCESS = 'AUTHENTICATED_SUCCESS';
export const AUTHENTICATED_FAILED = 'AUTHENTICATED_FAILED';
export const RESET_ERROR = 'RESET_ERROR';

export const signupUser = user => {
  return async dispatch => {
    try {
      dispatch({
        type: SIGN_UP_LOADING,
      });
      const createdUser = await signupHttp(user);
      if (createdUser.data) {
        localStorage.setItem('frohubUser', JSON.stringify(createdUser.data));
      }
      dispatch({
        type: AUTHENTICATED_SUCCESS,
        payload: createdUser,
      });
    } catch (error) {
      dispatch({
        type: AUTHENTICATED_FAILED,
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
    type: RESET_ERROR,
    payload: field,
  };
};
