import axios from 'axios';
import toastr from 'toastr';
import config from '../config/index';
import routes from '../constants/routes';
import {
  DELETE_REVIEW,
  DELETE_REVIEW_ISLOADING
} from './types';

const deleteReview = reviewId => ({
  type: DELETE_REVIEW,
  reviewId
});

const isLoading = () => ({
  type: DELETE_REVIEW_ISLOADING
});

const deleteEmployeeReview = details => (dispatch) => {
  dispatch(isLoading());
  return axios.delete(
    `${config.apiUrl}${routes.DELETEREVIEW}/${details.employeeId}?reviewId=${details.reviewId}`
  ).then(
    (response) => {
      const { data } = response;
      dispatch(deleteReview(details.reviewId));
      toastr.success(data.message);
    }
  ).catch(error => error);
};

export default deleteEmployeeReview;

