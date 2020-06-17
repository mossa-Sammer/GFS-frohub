export const AUTHENTICANTE_SUCCESS = 'AUTHENTICANTE_SUCCESS';
export const AUTHENTICANTE_LOADING = 'AUTHENTICANTE_LOADING';
export const AUTHENTICANTE_FAIL = 'AUTHENTICANTE_FAIL';

const checkAuth = () => {
  return async dispatch => {
    try {
      if (localStorage.getItem('user')) {
        dispatch({
          type: AUTHENTICANTE_SUCCESS,
          payload: JSON.parse(localStorage.getItem('user')),
        });
      } else
        dispatch({
          type: AUTHENTICANTE_FAIL,
        });
    } catch (err) {
      dispatch({
        type: AUTHENTICANTE_FAIL,
      });
    }
  };
};

export default checkAuth;
