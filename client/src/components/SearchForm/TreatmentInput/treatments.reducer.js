import {
  TREATMENT_INPUT_LOADING,
  TREATMENT_INPUT_LIST,
  TREATMENT_INPUT_ERROR,
} from './treatments.action';

const initialState = {
  loading: false,
  treatments: [],
  err: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TREATMENT_INPUT_LOADING:
      return {
        ...state,
        loading: true,
        err: null,
      };
    case TREATMENT_INPUT_LIST:
      return {
        ...state,
        treatments: action.payload,
        loading: false,
      };
    case TREATMENT_INPUT_ERROR:
      return {
        ...state,
        err: action.payload,
      };
    default:
      return state;
  }
};
