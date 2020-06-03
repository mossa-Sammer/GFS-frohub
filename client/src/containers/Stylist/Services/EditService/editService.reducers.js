import {
  EDIT_SERVICE_NAME_INPUT,
  EDIT_SERVICE_NEW_NAME_INPUT,
  EDIT_SERVICE_LENGTH_INPUT,
  EDIT_SERVICE_NEW_LENGTH_INPUT,
  EDIT_SERVICE_PRICE_INPUT,
} from './editService.actions';

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
      };
    }
    case EDIT_SERVICE_NEW_NAME_INPUT: {
      return {
        ...state,
        serviceNewName: action.payload,
      };
    }
    case EDIT_SERVICE_LENGTH_INPUT: {
      return {
        ...state,
        serviceLength: action.payload,
      };
    }
    case EDIT_SERVICE_NEW_LENGTH_INPUT: {
      return {
        ...state,
        serviceNewLength: action.payload,
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
