import axios from 'axios';
import { addSalon, updateSalon } from './api';

export const GET_SALON_DATA = 'GET_SALON_DATA';
export const POST_SALON_DATA = 'POST_SALON_DATA';
export const PATCH_SALON_DATA = 'PATCH_SALON_DATA';
export const COLLECT_FORMS_DATA = 'COLLECT_FORMS_DATA';

export const getSalonData = () => async (dispatch, getState) => {
  try {
    const {
      login: { loggedUser },
    } = getState();

    const { userId } = loggedUser;

    const { data } = await axios.get(`/api/salon/${userId}`);

    dispatch({
      type: GET_SALON_DATA,
      payload: data,
    });
  } catch (e) {
    if (e.response) {
      const { status } = e?.response;
      if (status === '404')
        dispatch({
          type: GET_SALON_DATA,
        });
    }
  }
};

export const addSalonData = (userId, data) => async dispatch => {
  const { salon, openingTimes, zones } = data;
  try {
    const {
      data: {
        data: { salon: addedSalon, times: addedTimes, zones: addedZones },
      },
    } = await addSalon(userId, salon, openingTimes, zones);

    dispatch({
      type: POST_SALON_DATA,
      payload: {
        salon: addedSalon,
        openingTimes: addedTimes,
        zones: addedZones,
      },
    });
  } catch (e) {
    console.log(e.response);
  }
};

export const updateSalonData = (salonId, data) => async dispatch => {
  const { salon, openingTimes, zones } = data;
  try {
    const {
      data: {
        salon: updatedSalon,
        openingTimes: updatedOpeningTimes,
        zones: updatedZones,
      },
    } = await updateSalon(salonId, salon, openingTimes, zones);

    dispatch({
      type: PATCH_SALON_DATA,
      payload: {
        salon: updatedSalon,
        openingTimes: updatedOpeningTimes,
        zones: updatedZones,
      },
    });
  } catch (e) {
    console.log(e.response);
  }
};
