import { combineReducers } from 'redux';

import loginReducer from './containers/Login/login.reducer';
import signupReducer from './containers/signup/signupReducer';
import authReducer from './auth/auth.reducer';
import {
  locationReducer,
  treatmentsReducer,
} from './components/SearchForm/search.reducers';
import searchReducer from './containers/Home/search.reducers';

export default combineReducers({
  login: loginReducer,
  auth: authReducer,
  signup: signupReducer,
  locations: locationReducer,
  treatments: treatmentsReducer,
  searchQuery: searchReducer,
});
