export const SORT_BY_RATE = 'SORT_BY_RATE';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const CLEAR_SORT = 'CLEAR_SORT';
export const INSTANT_BOOK = 'INSTANT_BOOK';

export default sortObj => {
  switch (sortObj.key) {
    case 'sortByRate':
      return {
        type: SORT_BY_RATE,
        payload: sortObj.value,
      };
    case 'sortByType':
      return {
        type: FILTER_BY_TYPE,
        payload: sortObj.value,
      };
    case 'instantBook':
      return {
        type: INSTANT_BOOK,
        payload: sortObj.value,
      };
    case 'clear':
      return {
        type: CLEAR_SORT,
      };
    default:
      throw Error('Input field name error');
  }
};
