import { combineReducers } from 'redux';

import loginReducer from './containers/Login/login.reducer';
import signupReducer from './containers/signup/signupReducer';
import authReducer from './auth/auth.reducer';

export default combineReducers({
  login: loginReducer,
  auth: authReducer,
  signup: signupReducer,
});
