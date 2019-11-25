import {
  SIGN_UP_LOADING,
  AUTHENTICATED_SUCCESS,
  RESET_ERROR,
} from './signupAction';

const initialState = {
  isAuth: false,
  loading: false,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        error: action.payload.err,
        // eslint-disable-next-line no-unneeded-ternary
        isAuth: action.payload.data ? true : false,
        loading: false,
      };
    case RESET_ERROR:
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
