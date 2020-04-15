import axios from 'axios';
import toastr from 'toastr';
import {
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_ERROR,
  DELETE_CREATE_REVIEW_ERROR,
  CREATE_REVIEW_ERROR_ISLOADING
} from './types';
import config from '../config/index';
import routes from '../constants/routes';

const createReview = data => ({
  type: CREATE_REVIEW_SUCCESS,
  data
});

const setReviewError = error => ({
  type: CREATE_REVIEW_ERROR,
  error
});

const createReviewIsLoading = () => ({
  type: CREATE_REVIEW_ERROR_ISLOADING
});

export const deleteReviewError = () => ({
  type: DELETE_CREATE_REVIEW_ERROR
});

const postReview = details => (dispatch) => {
  dispatch(createReviewIsLoading());
  return axios.post(`${config.apiUrl}${routes.CREATEREVIEW}/${details.employeeId}`, details).then((response) => {
    const { data } = response;
    dispatch(createReview(data));
    toastr.success(data.message);
  }).catch((error) => {
    if (error.response === undefined) {
      dispatch(setReviewError('Ooops! something went wrong please check your internet connection'));
      throw error;
    } else {
      const { data } = error.response;
      dispatch(setReviewError(data.message));
    }
  });
}

export default postReview;
