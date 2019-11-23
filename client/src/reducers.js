import { combineReducers } from 'redux';

import signupReducer from './containers/signup/signupReducer';

export default combineReducers({
  auth: signupReducer,
});
