import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];

const options = [rootReducer, initialState];

if (process.env.REACT_APP_NODE_ENV === 'production') {
  options.push(applyMiddleware(...middleware));
} else {
  middleware.push(logger);
  options.push(composeWithDevTools(applyMiddleware(...middleware)));
}

const store = createStore(...options);

export default store;
