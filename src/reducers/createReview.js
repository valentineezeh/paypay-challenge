import isEmpty from 'is-empty';
import {
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_ERROR,
  DELETE_CREATE_REVIEW_ERROR,
  CREATE_REVIEW_ERROR_ISLOADING
} from '../actions/types';

const initialState = {
  data: {},
  error: '',
  createReviewIsLoading: false,
  createReviewSuccess: false
};

const postReview = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        data: action.data,
        createReviewIsLoading: false,
        createReviewSuccess: !isEmpty(action.data)
      };
    case CREATE_REVIEW_ERROR_ISLOADING:
      return {
        ...state,
        createReviewIsLoading: true
      };
    case CREATE_REVIEW_ERROR:
      return {
        ...state,
        data: {},
        error: action.error,
        createReviewIsLoading: false
      };
    case DELETE_CREATE_REVIEW_ERROR:
      return {
        error: ''
      };
    default:
      return state;
  }
};

export default postReview;
