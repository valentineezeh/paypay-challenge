import {
  GET_EMPLOYEES_REVIEW_SUCCESS,
  GET_EMPLOYEES_REVIEW_ISLOADING
} from '../actions/types';

const initialState = {
  allReviews: [],
  reviewIsLoading: false,
};

const getReviews = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_REVIEW_SUCCESS:
      return {
        ...state,
        allReviews: action.data,
        reviewIsLoading: false
      };
    case GET_EMPLOYEES_REVIEW_ISLOADING:
      return {
        ...state,
        reviewIsLoading: true,
      };
    default: return state;
  }
};

export default getReviews;
