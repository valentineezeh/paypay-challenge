import axios from 'axios';
import config from '../config';
import routes from '../constants/routes';
import {
  GET_EMPLOYEES_REVIEW_SUCCESS,
  GET_EMPLOYEES_REVIEW_ISLOADING
} from './types';

const reviews = data => ({
  type: GET_EMPLOYEES_REVIEW_SUCCESS,
  data
});

const reviewIsLoading = () => ({
  type: GET_EMPLOYEES_REVIEW_ISLOADING
});

const getReviews = employeeId => (dispatch) => {
  dispatch(reviewIsLoading());
  return axios.get(`${config.apiUrl}${routes.GETREVIEWS}/${employeeId}`).then((response) => {
    const { data } = response;
    dispatch(reviews(data.data));
  }).catch(error => error);
};

export default getReviews;
