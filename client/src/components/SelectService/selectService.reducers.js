import { EDIT_SERVICE_INPUT } from './selectService.actions';

const initialState = {
  serviceName: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_SERVICE_INPUT: {
      return {
        ...state,
        serviceName: action.payload,
      };
    }
    default:
      return state;
  }
};
