import {
  SERVICES_LOADING,
  SERVICES_LIST,
  SERVICES_FILTER,
  SERVICES_ERROR,
} from './services.actions';

const initialState = {
  loading: false,
  services: [],
  filtredServices: [],
  err: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SERVICES_LOADING:
      return {
        ...state,
        loading: true,
        err: null,
      };
    case SERVICES_LIST:
      return {
        ...state,
        loading: false,
        services: action.payload.services,
        filtredServices: action.payload.filtredServices,
      };
    case SERVICES_FILTER:
      return {
        ...state,
        filtredServices: action.payload,
      };
    case SERVICES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
