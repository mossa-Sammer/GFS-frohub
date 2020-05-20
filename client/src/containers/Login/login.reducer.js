import { LOGIN_ERROR, LOGIN_LOADING } from './login.action';
import { AUTHENTICANTE_SUCCESS } from '../../auth/auth.action';

const initState = {
  error: null,
  loading: false,
  user: {},
};

export default function loginReducer(state = initState, action) {
  switch (action.type) {
    case AUTHENTICANTE_SUCCESS:
      return {
        error: null,
        loading: false,
        user: action.payload.userData,
      };
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return {
        ...state,
        loading: false,
        error: null,
      };
  }
}
