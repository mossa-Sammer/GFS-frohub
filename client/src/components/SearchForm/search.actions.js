export const TREATMENT_INPUT_CHANGE = 'TREATMENT_INPUT_CHANGE';
export const LOCATION_INPUT_CHANGE = 'LOCATION_INPUT_CHANGE';
export const TIME_INPUT_CHANGE = 'TIME_INPUT_CHANGE';
export const DATE_INPUT_CHANGE = 'DATE_INPUT_CHANGE';

export default inputField => async dispatch => {
  switch (inputField.name) {
    case 'treatment':
      dispatch({
        type: TREATMENT_INPUT_CHANGE,
        payload: inputField.value,
      });
      break;
    case 'location':
      dispatch({
        type: LOCATION_INPUT_CHANGE,
        payload: inputField.value,
      });
      break;
    case 'time':
      dispatch({
        type: TIME_INPUT_CHANGE,
        payload: inputField.value,
      });
      break;
    case 'date':
      dispatch({
        type: DATE_INPUT_CHANGE,
        payload: { date: inputField.value, day: inputField.day },
      });
      break;
    default:
      throw Error('Input field name error');
  }
};
