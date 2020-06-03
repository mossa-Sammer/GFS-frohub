export const ADD_SERVICE_NAME_INPUT = 'ADD_SERVICE_NAME_INPUT';
export const ADD_SERVICE_NEW_NAME_INPUT = 'ADD_SERVICE_NEW_NAME_INPUT';
export const ADD_SERVICE_LENGTH_INPUT = 'ADD_SERVICE_LENGTH_INPUT';
export const ADD_SERVICE_NEW_LENGTH_INPUT = 'ADD_SERVICE_NEW_LENGTH_INPUT';
export const ADD_SERVICE_PRICE_INPUT = 'ADD_SERVICE_PRICE_INPUT';

export default inputField => async dispatch => {
  switch (inputField.fieldName) {
    case 'serviceName':
      dispatch({
        type: ADD_SERVICE_NAME_INPUT,
        payload: inputField.value,
      });
      break;
    case 'serviceNewName':
      dispatch({
        type: ADD_SERVICE_NEW_NAME_INPUT,
        payload: inputField.value,
      });
      break;
    case 'serviceLength':
      dispatch({
        type: ADD_SERVICE_LENGTH_INPUT,
        payload: inputField.value,
      });
      break;
    case 'serviceNewLength':
      dispatch({
        type: ADD_SERVICE_NEW_LENGTH_INPUT,
        payload: inputField.value,
      });
      break;
    case 'servicePrice':
      dispatch({
        type: ADD_SERVICE_PRICE_INPUT,
        payload: inputField.value,
      });
      break;
    default:
      throw Error('Input field name error');
  }
};
