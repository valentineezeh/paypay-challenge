import axios from 'axios';
import toastr from 'toastr';
import {
  CREATE_FEEDBACK_SUCCESS,
  CREATE_FEEDBACK_ERROR,
  DELETE_CREATE_FEEDBACK_ERROR,
  CREATE_FEEDBACK_ERROR_ISLOADING
} from './types';
import config from '../config/index';
import routes from '../constants/routes';

const createFeedback = data => ({
  type: CREATE_FEEDBACK_SUCCESS,
  data,
});

const setFeedbackError = error => ({
  type: CREATE_FEEDBACK_ERROR,
  error
});

export const deleteFeedbackError = () => ({
  type: DELETE_CREATE_FEEDBACK_ERROR
});

const createFeedbackIsLoading = () => ({
  type: CREATE_FEEDBACK_ERROR_ISLOADING
});

const postFeedback = details => (dispatch) => {
  dispatch(createFeedbackIsLoading());
  return axios.post(
    `${config.apiUrl}${routes.CREATEFEEDBACK}/${details.employeeId}?reviewId=${details.reviewId}`, details
  ).then((response) => {
    const { data } = response;
    dispatch(createFeedback(data));
    toastr.success(data.message);
  }).catch((error) => {
    if (error.response === undefined) {
      dispatch(setFeedbackError('Ooops! something went wrong please check your internet connection'));
      throw error;
    } else {
      const { data } = error.response;
      dispatch(setFeedbackError(data.message));
    }
  })
};

export default postFeedback;
