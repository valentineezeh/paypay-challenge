import isEmpty from 'is-empty';
import {
  CREATE_FEEDBACK_SUCCESS,
  CREATE_FEEDBACK_ERROR,
  DELETE_CREATE_FEEDBACK_ERROR,
  CREATE_FEEDBACK_ERROR_ISLOADING
} from '../actions/types';

const initialState = {
  data: {},
  error: '',
  createFeedbackIsLoading: false,
  createFeedbackSuccess: false
};

const postFeedback = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        data: action.data,
        createFeedbackIsLoading: false,
        createFeedbackSuccess: !isEmpty(action.data)
      };
    case CREATE_FEEDBACK_ERROR_ISLOADING:
      return {
        ...state,
        createFeedbackIsLoading: true
      };
    case CREATE_FEEDBACK_ERROR:
      return {
        ...state,
        data: {},
        error: action.error,
        createFeedbackIsLoading: false
      };
    case DELETE_CREATE_FEEDBACK_ERROR:
      return {
        error: ''
      };

    default:
      return state;
  }
};

export default postFeedback;
