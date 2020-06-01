import {
  EDIT_SERVICE_NAME_INPUT,
  EDIT_SERVICE_NEW_NAME_INPUT,
  EDIT_SERVICE_LENGTH_INPUT,
} from './selectService.actions';

const initialState = {
  serviceName: '',
  serviceNewName: '',
  serviceLength: '',
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
        // serviceName: '',
      };
    }
    default:
      return state;
  }
};
