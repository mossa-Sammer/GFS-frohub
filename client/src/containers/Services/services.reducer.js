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
  slots: [],
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
        loading: false,
        err: null,
        stores: action.payload,
      };
    case SERVICES_LIST:
      return {
        ...state,
        loading: false,
        services: action.payload.services,
        filtredServices: action.payload.filtredServices,
        slots: action.payload.slots,
      };
    case SERVICES_FILTER:
      return {
        ...state,
        filtredServices: action.payload,
      };
    case SERVICES_SORT:
      return {
        ...state,
        filtredServices: action.payload,
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
