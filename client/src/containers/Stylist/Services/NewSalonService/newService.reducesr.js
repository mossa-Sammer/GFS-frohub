import {
  ADD_SERVICE_NAME_INPUT,
  ADD_SERVICE_NEW_NAME_INPUT,
  ADD_SERVICE_LENGTH_INPUT,
  ADD_SERVICE_NEW_LENGTH_INPUT,
  ADD_SERVICE_PRICE_INPUT,
  ADD_SERVICE_IMAGES,
  SALON_SERVICE_ERROR,
} from './newService.actions';

const initialState = {
  serviceName: '',
  serviceNewName: '',
  serviceLength: '',
  serviceNewLength: '',
  price: '',
  images: [],
  err: false,
  errMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SERVICE_NAME_INPUT: {
      return {
        ...state,
        err: false,
        errMsg: '',
        serviceName: action.payload,
      };
    }
    case ADD_SERVICE_NEW_NAME_INPUT: {
      return {
        ...state,
        err: false,
        errMsg: '',
        serviceNewName: action.payload,
      };
    }
    case ADD_SERVICE_LENGTH_INPUT: {
      return {
        ...state,
        err: false,
        errMsg: '',
        serviceLength: action.payload,
      };
    }
    case ADD_SERVICE_NEW_LENGTH_INPUT: {
      return {
        ...state,
        err: false,
        errMsg: '',
        serviceNewLength: action.payload,
      };
    }
    case ADD_SERVICE_PRICE_INPUT: {
      return {
        ...state,
        err: false,
        errMsg: '',
        price: action.payload,
      };
    }
    case ADD_SERVICE_IMAGES: {
      return {
        ...state,
        err: false,
        errMsg: '',
        images: action.payload,
      };
    }
    case SALON_SERVICE_ERROR: {
      return {
        ...state,
        err: true,
        errMsg: action.payload,
      };
    }
    default:
      return state;
  }
};
