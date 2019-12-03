import {
  LOCATION_INPUT_LOADING,
  LOCATION_INPUT_LIST,
  LOCATION_INPUT_ERROR,
} from './location.actions';

const initialState = {
  loading: false,
  locationList: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_INPUT_LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case LOCATION_INPUT_LIST:
      return {
        ...state,
        loading: false,
        locationList: action.payload,
      };
    case LOCATION_INPUT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
