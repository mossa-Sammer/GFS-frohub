import { SALON_SERVICE_ERROR } from '../NewSalonService/newService.actions';

export const EDIT_SERVICE_NAME_INPUT = 'EDIT_SERVICE_NAME_INPUT';
export const EDIT_SERVICE_NEW_NAME_INPUT = 'EDIT_SERVICE_NEW_NAME_INPUT';
export const EDIT_SERVICE_LENGTH_INPUT = 'EDIT_SERVICE_LENGTH_INPUT';
export const EDIT_SERVICE_NEW_LENGTH_INPUT = 'EDIT_SERVICE_NEW_LENGTH_INPUT';
export const EDIT_SERVICE_PRICE_INPUT = 'EDIT_SERVICE_PRICE_INPUT';
export const EDIT_SERVICE_IMAGES = 'EDIT_SERVICE_IMAGES';

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
    case 'serviceNewLength':
      dispatch({
        type: EDIT_SERVICE_NEW_LENGTH_INPUT,
        payload: inputField.value,
      });
      break;
    case 'servicePrice':
      dispatch({
        type: EDIT_SERVICE_PRICE_INPUT,
        payload: inputField.value,
      });
      break;
    case 'serviceImage':
      dispatch({
        type: EDIT_SERVICE_IMAGES,
        payload: inputField.value,
      });
      break;
    case 'serviceError':
      dispatch({
        type: SALON_SERVICE_ERROR,
        payload: inputField.value,
      });
      break;
    default:
      throw Error('Input field name error');
  }
};
