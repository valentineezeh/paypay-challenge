import isEmpty from 'is-empty';
import {
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_ERROR,
  DELETE_CREATE_EMPLOYEE_ERROR,
  CREATE_EMPLOYEE_ERROR_ISLOADING
} from '../actions/types';

const initialState = {
  data: {},
  error: '',
  createEmployeeIsLoading: false,
  createEmployeeSuccess: false
};

const postEmployee = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        createEmployeeSuccess: !isEmpty(action.data),
        data: action.data,
        createEmployeeIsLoading: false
      };
    case CREATE_EMPLOYEE_ERROR_ISLOADING:
      return {
        ...state,
        createEmployeeIsLoading: true
      };
    case CREATE_EMPLOYEE_ERROR:
      return {
        ...state,
        data: {},
        error: action.error,
        createEmployeeIsLoading: false
      };
    case DELETE_CREATE_EMPLOYEE_ERROR:
      return {
        error: ''
      };
    default:
      return state;
  }
};

export default postEmployee;
