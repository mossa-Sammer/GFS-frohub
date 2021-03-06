import {
  SERVICES_LOADING,
  SERVICES_STORES,
  SERVICES_LIST,
  SERVICES_FILTER,
  SERVICES_ERROR,
  SERVICES_SORT,
} from './services.actions';

const initialState = {
  loading: false,
  services: [],
  filtredServices: [],
  sortedServices: [],
  stores: [],
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
    case SERVICES_STORES:
      return {
        ...state,
        loading: true,
        err: null,
        stores: action.payload,
      };
    case SERVICES_LIST:
      return {
        ...state,
        loading: false,
        services: action.payload.services,
        filtredServices: action.payload.filtredServices,
        sortedServices: action.payload.filtredServices,
      };
    case SERVICES_FILTER:
      return {
        ...state,
        filtredServices: action.payload,
        sortedServices: action.payload,
      };
    case SERVICES_SORT:
      return {
        ...state,
        sortedServices: action.payload,
        loading: false,
      };
    case SERVICES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
