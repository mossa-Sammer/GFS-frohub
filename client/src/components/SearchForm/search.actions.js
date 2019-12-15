import axios from 'axios';
import moment from 'moment';

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
      {
        const maxDate = moment(inputField.value).format('DD/MM/YYYY');
        const { data: slots } = await axios.get(
          `https://frohub.com//wp-json/wc-bookings/v1/products/slots?max_date=${maxDate}`
        );
        dispatch({
          type: DATE_INPUT_CHANGE,
          payload: { date: inputField.value, slots: slots.records },
        });
      }
      break;
    default:
      throw Error('Input field name error');
  }
};
