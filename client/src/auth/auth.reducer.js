import { AUTHENTICANTE_SUCCESS, AUTHENTICANTE_FAIL } from './auth.action';

const initialState = {
  isAuth: false,
  loading: true,
  loggedUser: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICANTE_SUCCESS:
      return {
        isAuth: true,
        loading: false,
        loggedUser: action.payload,
      };
    case AUTHENTICANTE_FAIL:
      return {
        loading: false,
        isAuth: false,
      };
    default:
      return state;
  }
}
