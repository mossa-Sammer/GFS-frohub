// import axios from 'axios';
// eslint-disable-next-line import/prefer-default-export
export const AUTHENTICANTE_SUCCESS = 'AUTHENTICANTE_SUCCESS';
export const AUTHENTICANTE_LOADING = 'AUTHENTICANTE_LOADING';
export const AUTHENTICANTE_FAIL = 'AUTHENTICANTE_FAIL';

const checkAuth = () => {
  return async dispatch => {
    // try {
    // await axios.get('/api/authenticated');
    dispatch({
      type: AUTHENTICANTE_SUCCESS,
    });
    // }
    //   catch (err) {
    //     dispatch({
    //       type: AUTHENTICANTE_FAIL,
    //     });
    //   }
  };
};

export default checkAuth;
