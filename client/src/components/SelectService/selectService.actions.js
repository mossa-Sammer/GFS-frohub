export const EDIT_SERVICE_INPUT = 'EDIT_SERVICE_INPUT';

export default inputField => async dispatch => {
  switch (inputField.fieldName) {
    case 'serviceName':
      dispatch({
        type: EDIT_SERVICE_INPUT,
        payload: inputField.value,
      });
      break;
    default:
      throw Error('Input field name error');
  }
};
