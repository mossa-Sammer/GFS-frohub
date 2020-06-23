import {
  LOADING_SERVICE_IMAGES,
  GET_SERVICE_IMAGES,
  SERVICE_IMAGES_FAILED,
} from './services.images.actions';

const initState = {
  loading: false,
  images: [],
  imagesLength: 0,
  err: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOADING_SERVICE_IMAGES:
      return {
        loading: true,
        ...state,
      };
    case GET_SERVICE_IMAGES:
      return {
        loading: false,
        images: action.payload,
        imagesLength: action.payload.length,
      };
    case SERVICE_IMAGES_FAILED:
      return {
        loading: false,
        err: true,
        ...state,
      };
    default:
      return state;
  }
};
