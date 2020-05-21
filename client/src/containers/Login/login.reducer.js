import { LOGIN_ERROR, LOGIN_LOADING } from './login.action';
import { AUTHENTICANTE_SUCCESS } from '../../auth/auth.action';

const storedUser = JSON.parse(localStorage.getItem('user'));

const initState = {
  error: null,
  loading: false,
  loggedUser: storedUser || {},
};

export default function loginReducer(state = initState, action) {
  let user;
  switch (action.type) {
    case AUTHENTICANTE_SUCCESS:
      if (Object.keys(initState.loggedUser) !== 0) {
        user = initState.loggedUser;
      } else {
        const { loggedUser } = action.payload;
        user = loggedUser;
      }
      return {
        ...state,
        error: null,
        loading: false,
        loggedUser: user,
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
