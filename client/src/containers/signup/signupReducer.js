import {
  SIGNUP_LOADING,
  AUTHENTICATED_SUCCESS,
  RESET_SIGNUP_ERROR,
  SIGNUP_FAIL,
} from './signupAction';

const initialState = {
  loading: false,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AUTHENTICATED_SUCCESS:
      return {
        error: '',
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
