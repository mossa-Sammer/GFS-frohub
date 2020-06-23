import axios from '../../axios-config';

export const LOADING_SERVICE_IMAGES = 'LOADING_SERVICE_IMAGES';
export const GET_SERVICE_IMAGES = 'GET_SERVICE_IMAGES';
export const SERVICE_IMAGES_FAILED = 'SERVICE_IMAGES_FAILED';

const serviceImageAction = serviceId => async dispatch => {
  try {
    dispatch({
      type: LOADING_SERVICE_IMAGES,
    });
    const {
      data: { images },
    } = await axios.get(`/service/${serviceId}/images`);
    return dispatch({
      type: GET_SERVICE_IMAGES,
      payload: images,
    });
  } catch (err) {
    dispatch({
      type: SERVICE_IMAGES_FAILED,
    });
  }
};

export default serviceImageAction;
