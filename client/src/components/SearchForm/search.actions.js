export const TREATMENT_INPUT_CHANGE = 'TREATMENT_INPUT_CHANGE';
export const LOCATION_INPUT_CHANGE = 'LOCATION_INPUT_CHANGE';
export const TIME_INPUT_CHANGE = 'TIME_INPUT_CHANGE';
export const DATE_INPUT_CHANGE = 'DATE_INPUT_CHANGE';

export default inputField => {
  console.log(9898, inputField);
  switch (inputField.name) {
    case 'treatment':
      console.log(222, inputField.name);
      console.log(333, inputField.value);
      return {
        type: TREATMENT_INPUT_CHANGE,
        payload: inputField.value,
      };
    case 'location':
      return {
        type: LOCATION_INPUT_CHANGE,
        payload: inputField.value,
      };
    case 'time':
      return {
        type: TIME_INPUT_CHANGE,
        payload: inputField.value,
      };
    case 'date':
      return {
        type: DATE_INPUT_CHANGE,
        payload: inputField.value,
      };
    default:
      throw Error('Input field name error');
  }
};
