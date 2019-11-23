import { LOADING, SIGN_UP } from './types';

const initialState = {
  isAuth: false,
  loading: false,
  error: '',
};

export default (state = initialState, action) => {
  // console.log(777, action.payload)
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
        isAuth: action.payload.data ? true : false,
        loading: false,
      };
    default:
      return { ...state };
  }
};
