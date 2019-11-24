import { LOADING, SIGN_UP } from './signupAction';

const initialState = {
  isAuth: false,
  loading: false,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SIGN_UP:
      return {
        ...state,
        error: action.payload.err,
        // eslint-disable-next-line no-unneeded-ternary
        isAuth: action.payload.data ? true : false,
        loading: false,
      };
    default:
      return { ...state };
  }
};
