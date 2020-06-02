import {
  EDIT_SERVICE_NAME_INPUT,
  EDIT_SERVICE_NEW_NAME_INPUT,
  EDIT_SERVICE_LENGTH_INPUT,
  EDIT_SERVICE_NEW_LENGTH_INPUT,
  EDIT_SERVICE_PRICE_INPUT,
} from './selectService.actions';

const initialState = {
  serviceName: '',
  serviceNewName: '',
  serviceLength: '',
  serviceNewLength: '',
  price: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_SERVICE_NAME_INPUT: {
      return {
        ...state,
        serviceName: action.payload,
        // serviceNewName: '',
      };
    }
    case EDIT_SERVICE_NEW_NAME_INPUT: {
      return {
        ...state,
        serviceNewName: action.payload,
        // serviceName: '',
      };
    }
    case EDIT_SERVICE_LENGTH_INPUT: {
      return {
        ...state,
        serviceLength: action.payload,
        // serviceNewLength: '',
      };
    }
    case EDIT_SERVICE_NEW_LENGTH_INPUT: {
      return {
        ...state,
        serviceNewLength: action.payload,
        // serviceLength: '',
      };
    }
    case EDIT_SERVICE_PRICE_INPUT: {
      return {
        ...state,
        price: action.payload,
      };
    }
    default:
      return state;
  }
};
