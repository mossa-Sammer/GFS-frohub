import {
  TREATMENT_INPUT_CHANGE,
  LOCATION_INPUT_CHANGE,
  TIME_INPUT_CHANGE,
  DATE_INPUT_CHANGE,
} from './search.actions';

const initialState = {
  treatment: '',
  // I think we should get the default location (address & postcode) from geolocation
  location: '',
  time: 'any time',
  date: 'any date',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TREATMENT_INPUT_CHANGE:
      return {
        ...state,
        treatment: action.payload,
      };
    case LOCATION_INPUT_CHANGE:
      return {
        ...state,
        location: action.payload,
      };
    case TIME_INPUT_CHANGE:
      return {
        ...state,
        time: action.payload,
      };
    case DATE_INPUT_CHANGE:
      return {
        ...state,
        date: action.payload,
      };
    default:
      return state;
  }
};
