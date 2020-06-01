import {
  EDIT_SERVICE_NAME_INPUT,
  EDIT_SERVICE_NEW_NAME_INPUT,
} from './selectService.actions';

const initialState = {
  serviceName: '',
  serviceNewName: '',
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
    default:
      return state;
  }
};
