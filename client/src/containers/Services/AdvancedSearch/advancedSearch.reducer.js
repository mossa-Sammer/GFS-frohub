import {
  SORT_BY_RATE,
  FILTER_BY_TYPE,
  CLEAR_SORT,
  INSTANT_BOOK,
} from './advancedSearch.actions';

const initialState = {
  sortBy: null,
  serviceType: null,
  instantBook: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SORT_BY_RATE:
      return {
        ...state,
        sortBy: action.payload,
      };
    case FILTER_BY_TYPE:
      return {
        ...state,
        serviceType: action.payload,
      };
    case INSTANT_BOOK:
      return {
        ...state,
        instantBook: action.payload,
      };
    case CLEAR_SORT:
      return {
        sortBy: null,
        serviceType: null,
        instantBook: false,
      };
    default:
      return state;
  }
};
