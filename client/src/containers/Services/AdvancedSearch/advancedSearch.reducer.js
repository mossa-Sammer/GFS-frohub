import {
  SORT_BY_RATE,
  FILTER_BY_TYPE,
  CLEAR_SORT,
} from './advancedSearch.actions';

const initialState = {
  byRate: null,
  byService: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SORT_BY_RATE:
      return {
        ...state,
        byRate: action.payload,
      };
    case FILTER_BY_TYPE:
      return {
        ...state,
        byService: action.payload,
      };
    case CLEAR_SORT:
      return {
        byRate: null,
        byService: null,
      };
    default:
      return state;
  }
};
