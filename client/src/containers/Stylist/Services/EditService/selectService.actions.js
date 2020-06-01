export const EDIT_SERVICE_NAME_INPUT = 'EDIT_SERVICE_NAME_INPUT';
export const EDIT_SERVICE_NEW_NAME_INPUT = 'EDIT_SERVICE_NEW_NAME_INPUT';
export const EDIT_SERVICE_LENGTH_INPUT = 'EDIT_SERVICE_LENGTH_INPUT';

export default inputField => async dispatch => {
  switch (inputField.fieldName) {
    case 'serviceName':
      dispatch({
        type: EDIT_SERVICE_NAME_INPUT,
        payload: inputField.value,
      });
      break;
    case 'serviceNewName':
      dispatch({
        type: EDIT_SERVICE_NEW_NAME_INPUT,
        payload: inputField.value,
      });
      break;
    case 'serviceLength':
      dispatch({
        type: EDIT_SERVICE_LENGTH_INPUT,
        payload: inputField.value,
      });
      break;
    default:
      throw Error('Input field name error');
  }
};
