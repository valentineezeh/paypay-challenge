import { combineReducers } from 'redux';
import getEmployees from './getEmployees';
import getReviews from './getReviews';
import postEmployee from './createEmployee';
import postReview from './createReview';
import postAdmin from './createAdmin';
import loginAdmin from './loginAdmin';
import postFeedback from './createFeedback';

export default combineReducers({
  getEmployees,
  getReviews,
  postEmployee,
  postReview,
  postAdmin,
  loginAdmin,
  postFeedback
});
