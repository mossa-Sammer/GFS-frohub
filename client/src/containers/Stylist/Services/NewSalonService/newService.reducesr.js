import {
  ADD_SERVICE_NAME_INPUT,
  ADD_SERVICE_NEW_NAME_INPUT,
  ADD_SERVICE_LENGTH_INPUT,
  ADD_SERVICE_NEW_LENGTH_INPUT,
  ADD_SERVICE_PRICE_INPUT,
} from './newService.actions';

const initialState = {
  serviceName: '',
  serviceNewName: '',
  serviceLength: '',
  serviceNewLength: '',
  price: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SERVICE_NAME_INPUT: {
      return {
        ...state,
        serviceName: action.payload,
      };
    }
    case ADD_SERVICE_NEW_NAME_INPUT: {
      return {
        ...state,
        serviceNewName: action.payload,
      };
    }
    case ADD_SERVICE_LENGTH_INPUT: {
      return {
        ...state,
        serviceLength: action.payload,
      };
    }
    case ADD_SERVICE_NEW_LENGTH_INPUT: {
      return {
        ...state,
        serviceNewLength: action.payload,
      };
    }
    case ADD_SERVICE_PRICE_INPUT: {
      return {
        ...state,
        price: action.payload,
      };
    }
    default:
      return state;
  }
};
