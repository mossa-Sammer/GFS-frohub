import { AUTHENTICANTE_SUCCESS } from './auth.action';

export default function authReducer(state, action) {
  switch (action.type) {
    case AUTHENTICANTE_SUCCESS:
      return {
        isAuth: true,
      };

    default:
      return {
        isAuth: false,
      };
  }
}
