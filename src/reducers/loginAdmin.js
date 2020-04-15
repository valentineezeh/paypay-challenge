import isEmpty from 'is-empty';
import {
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_ERROR,
  DELETE_LOGIN_ADMIN_ERROR,
  LOGIN_ADMIN_ERROR_ISLOADING,
  LOGOUT_USER
} from '../actions/types';

const initialState = {
  data: {},
  error: '',
  loginAdminIsLoading: false,
  loginAdminSuccess: false,
  isAuthenticated: false,
};

const loginAdmin = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ADMIN_SUCCESS:
      return {
        ...state,
        loginAdminSuccess: !isEmpty(action.data),
        data: action.data,
        loginAdminIsLoading: false,
        isAuthenticated: !isEmpty(action.data)
      };
    case LOGIN_ADMIN_ERROR_ISLOADING:
      return {
        ...state,
        loginAdminIsLoading: true
      };
    case LOGIN_ADMIN_ERROR:
      return {
        ...state,
        data: {},
        error: action.error,
        loginAdminIsLoading: false
      };
    case DELETE_LOGIN_ADMIN_ERROR:
      return {
        error: ''
      };
    case LOGOUT_USER:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};

export default loginAdmin;
