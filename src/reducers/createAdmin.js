import isEmpty from 'is-empty';
import {
  CREATE_ADMIN_SUCCESS,
  CREATE_ADMIN_ERROR,
  DELETE_CREATE_ADMIN_ERROR,
  CREATE_ADMIN_ERROR_ISLOADING
} from '../actions/types';

const initialState = {
  data: {},
  error: '',
  createAdminIsLoading: false,
  createAdminSuccess: false,
  isAuthenticated: false
};

const postAdmin = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        createAdminSuccess: !isEmpty(action.data),
        data: action.data,
        createAdminIsLoading: false,
        isAuthenticated: !isEmpty(action.data)
      };
    case CREATE_ADMIN_ERROR_ISLOADING:
      return {
        ...state,
        createAdminIsLoading: true
      };
    case CREATE_ADMIN_ERROR:
      return {
        ...state,
        data: {},
        error: action.error,
        createAdminIsLoading: false
      };
    case DELETE_CREATE_ADMIN_ERROR:
      return {
        error: ''
      };
    default:
      return state;
  }
};

export default postAdmin;
