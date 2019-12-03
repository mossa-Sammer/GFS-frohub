import {
  LOADING_SEARCH_RESULTS,
  GET_SERVICES,
  FILTER_SERVICES,
  SEARCH_ERROR,
} from './services.actions';

const initialState = {
  loading: false,
  services: [],
  filtredServices: [],
  err: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SEARCH_RESULTS:
      return {
        ...state,
        loading: true,
        err: null,
      };
    case GET_SERVICES:
      return {
        ...state,
        loading: false,
        services: action.payload,
      };
    case FILTER_SERVICES:
      return {
        ...state,
        filtredServices: action.payload,
      };
    case SEARCH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
