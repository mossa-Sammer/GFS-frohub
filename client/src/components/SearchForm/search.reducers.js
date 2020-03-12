import locationReducer from './LocationInput/location.reducer';
import treatmentsReducer from './TreatmentInput/treatments.reducer';

import {
  TREATMENT_INPUT_CHANGE,
  LOCATION_INPUT_CHANGE,
  TIME_INPUT_CHANGE,
  DATE_INPUT_CHANGE,
} from './search.actions';

const initialState = {
  treatment: '',
  treatmentName: '',
  location: null,
  time: {
    from: '',
    to: '',
  },
  date: null,
  day: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TREATMENT_INPUT_CHANGE:
      return {
        ...state,
        treatment: action.payload,
        treatmentName: action.treatmentName,
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
        date: action.payload.date,
        day: action.payload.day,
      };
    default:
      return state;
  }
};

// I think we should get the default location (address & postcode) from geolocation
export { locationReducer, treatmentsReducer };
