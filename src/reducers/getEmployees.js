/* eslint-disable no-case-declarations */
import {
  GET_EMPLOYEES_LIST_SUCCESS,
  GET_EMPLOYEES_LIST_ISLOADING,
  DELETE_REVIEW,
} from '../actions/types';

const initialState = {
  allEmployees: [],
  isLoading: false,
  reviews: []
};

const getEmployees = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_LIST_SUCCESS:
      return {
        ...state,
        allEmployees: action.data,
        reviews: action.reviews,
        isLoading: false,
      };
    case GET_EMPLOYEES_LIST_ISLOADING:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_REVIEW:
      const removeReview = state.allEmployees.map((employee) => {
        const remove = employee.reviews.filter(i => i._id !== action.reviewId);
        return {
          ...employee,
          reviews: remove
        };
      });
      return {
        ...state,
        allEmployees: removeReview,
      };
    default: return state;
  }
};

export default getEmployees;
