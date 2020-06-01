import { combineReducers } from 'redux';

import loginReducer from './containers/Login/login.reducer';
import signupReducer from './containers/signup/signupReducer';
import authReducer from './auth/auth.reducer';
import searchReducer, {
  locationReducer,
  treatmentsReducer,
} from './components/SearchForm/search.reducers';
import servicesReducer from './containers/Services/services.reducer';
import advancedSearchReducer from './containers/Services/AdvancedSearch/advancedSearch.reducer';
import editSalonServiceReducer from './containers/Stylist/Services/EditService/selectService.reducers';

export default combineReducers({
  login: loginReducer,
  auth: authReducer,
  signup: signupReducer,
  locations: locationReducer,
  treatments: treatmentsReducer,
  searchQueries: searchReducer,
  advancedSearchQueries: advancedSearchReducer,
  services: servicesReducer,
  editSalonService: editSalonServiceReducer,
});
