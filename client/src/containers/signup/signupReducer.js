import {
  SIGNUP_LOADING,
  RESET_SIGNUP_ERROR,
  SIGNUP_FAIL,
} from './signupAction';

import { AUTHENTICANTE_SUCCESS } from '../../auth/auth.action';

const initialState = {
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AUTHENTICANTE_SUCCESS:
      return {
        error: null,
        loading: false,
      };
    case SIGNUP_FAIL:
      return {
        error: action.payload.error,
        loading: false,
      };
    case RESET_SIGNUP_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload]: undefined,
        },
      };
    default:
      return { ...state };
  }
};
