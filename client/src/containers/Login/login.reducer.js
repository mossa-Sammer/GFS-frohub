import { LOGIN_ERROR, LOGIN_LOADING } from './login.action';
import { AUTHENTICANTE_SUCCESS } from '../../auth/auth.action';

export default function loginReducer(state, action) {
  switch (action.type) {
    case AUTHENTICANTE_SUCCESS:
      return {
        error: null,
        loading: false,
      };
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_ERROR:
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return {
        loading: false,
        error: null,
      };
  }
}
