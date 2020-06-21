import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS } from './login.action';
// import { AUTHENTICANTE_SUCCESS } from '../../auth/auth.action';

const initState = {
  error: null,
  loading: false,
  loggedUser: {},
};

export default function loginReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loggedUser: action.payload.loggedUser,
      };
    }
    // case AUTHENTICANTE_SUCCESS:
    //   return {
    //     ...state,
    //     error: null,
    //     loading: false,
    //     loggedUser: action.payload,
    //   };
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
