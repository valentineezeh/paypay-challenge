import axios from 'axios';
import toastr from 'toastr';
import {
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_ERROR,
  DELETE_LOGIN_ADMIN_ERROR,
  LOGIN_ADMIN_ERROR_ISLOADING
} from './types';
import config from '../config/index';
import routes from '../constants/routes';

export const loginAdmin = data => ({
  type: LOGIN_ADMIN_SUCCESS,
  data
});

const setLoginAdminError = error => ({
  type: LOGIN_ADMIN_ERROR,
  error
});

export const deleteLoginAdminError = () => ({
  type: DELETE_LOGIN_ADMIN_ERROR,
});

const loginAdminIsLoading = () => ({
  type: LOGIN_ADMIN_ERROR_ISLOADING
});

const loginAdminRequest = details => (dispatch) => {
  dispatch(loginAdminIsLoading());
  return axios.post(
    `${config.apiUrl}${routes.LOGINADMIN}`, details
  ).then((response) => {
    const { data } = response;
    dispatch(loginAdmin(data));
    localStorage.setItem('token', data.token);
    toastr.success(data.message)
  }).catch((error) => {
    if (error.response === undefined) {
      dispatch(setLoginAdminError('Ooops! something went wrong please check your internet connection'));
      throw error;
    } else {
      const { data } = error.response;
      dispatch(setLoginAdminError(data.message));
    }
  });
};

export default loginAdminRequest;
