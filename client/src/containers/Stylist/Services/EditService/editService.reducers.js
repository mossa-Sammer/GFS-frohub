import {
  EDIT_SERVICE_NAME_INPUT,
  EDIT_SERVICE_NEW_NAME_INPUT,
  EDIT_SERVICE_LENGTH_INPUT,
  EDIT_SERVICE_NEW_LENGTH_INPUT,
  EDIT_SERVICE_PRICE_INPUT,
  EDIT_SERVICE_IMAGES,
} from './editService.actions';

import { SALON_SERVICE_ERROR } from '../NewSalonService/newService.actions';

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
    case EDIT_SERVICE_NAME_INPUT: {
      return {
        ...state,
        err: false,
        errMsg: '',
        serviceName: action.payload,
      };
    }
    case EDIT_SERVICE_NEW_NAME_INPUT: {
      return {
        ...state,
        err: false,
        errMsg: '',
        serviceNewName: action.payload,
      };
    }
    case EDIT_SERVICE_LENGTH_INPUT: {
      return {
        ...state,
        err: false,
        errMsg: '',
        serviceLength: action.payload,
      };
    }
    case EDIT_SERVICE_NEW_LENGTH_INPUT: {
      return {
        ...state,
        err: false,
        errMsg: '',
        serviceNewLength: action.payload,
      };
    }
    case EDIT_SERVICE_PRICE_INPUT: {
      return {
        ...state,
        err: false,
        errMsg: '',
        price: action.payload,
      };
    }
    case EDIT_SERVICE_IMAGES: {
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
