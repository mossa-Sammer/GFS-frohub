import {
  GET_SALON_DATA,
  POST_SALON_DATA,
  PATCH_SALON_DATA,
} from './salon.actions';

const intialState = {};

const salonReducer = (state = intialState, action) => {
  const { type, payload } = action;
  if (type === GET_SALON_DATA) {
    if (payload) {
      const { salon, zones, openingTimes } = payload;
      return {
        ...state,
        salon,
        zones,
        openingTimes,
      };
    }
    return { ...state };
  }
  if (type === POST_SALON_DATA) {
    const { salon, zones, openingTimes } = payload;
    return {
      ...state,
      salon,
      zones,
      openingTimes,
    };
  }
  if (type === PATCH_SALON_DATA) {
    const { salon, zones, openingTimes } = payload;
    return {
      ...state,
      salon,
      zones,
      openingTimes,
    };
  }
  return { ...state };
};

export default salonReducer;
