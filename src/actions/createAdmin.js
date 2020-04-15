import axios from 'axios';
import toastr from 'toastr';
import {
  CREATE_ADMIN_SUCCESS,
  CREATE_ADMIN_ERROR,
  DELETE_CREATE_ADMIN_ERROR,
  CREATE_ADMIN_ERROR_ISLOADING
} from './types';
import config from '../config/index';
import routes from '../constants/routes';

const createAdmin = data => ({
  type: CREATE_ADMIN_SUCCESS,
  data
});

const setAdminError = error => ({
  type: CREATE_ADMIN_ERROR,
  error
});

export const deleteAdminError = () => ({
  type: DELETE_CREATE_ADMIN_ERROR
});

const createAdminIsLoading = () => ({
  type: CREATE_ADMIN_ERROR_ISLOADING
});

const postAdmin = details => (dispatch) => {
  dispatch(createAdminIsLoading());
  return axios.post(
    `${config.apiUrl}${routes.CREATEADMIN}`, details
  ).then((response) => {
    const { data } = response;
    dispatch(createAdmin(data));
    localStorage.setItem('token', data.token);
    toastr.success(data.message);
  }).catch((error) => {
    if (error.response === undefined) {
      dispatch(setAdminError('Ooops! something went wrong please check your internet connection'));
      throw error;
    } else {
      const { data } = error.response;
      dispatch(setAdminError(data.message));
    }
  });
};

export default postAdmin;
