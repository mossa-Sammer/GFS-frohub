export const TREATMENT_INPUT_CHANGE = 'TREATMENT_INPUT_CHANGE';
export const LOCATION_INPUT_CHANGE = 'LOCATION_INPUT_CHANGE';
export const TIME_INPUT_CHANGE = 'TIME_INPUT_CHANGE';
export const DATE_INPUT_CHANGE = 'DATE_INPUT_CHANGE';

export default inputField => async dispatch => {
  try {
    switch (inputField.name) {
      case 'treatment':
        return dispatch({
          type: TREATMENT_INPUT_CHANGE,
          payload: inputField.value,
        });
      case 'location':
        return dispatch({
          type: LOCATION_INPUT_CHANGE,
          payload: inputField.value,
        });
      case 'time':
        return dispatch({
          type: TIME_INPUT_CHANGE,
          payload: inputField.value,
        });
      case 'date':
        return dispatch({
          type: DATE_INPUT_CHANGE,
          payload: inputField.value,
        });
      default:
        return '';
    }
  } catch (err) {
    return dispatch({});
  }
};
