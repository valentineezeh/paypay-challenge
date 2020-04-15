import axios from 'axios';
import toastr from 'toastr';
import {
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_ERROR,
  DELETE_CREATE_EMPLOYEE_ERROR,
  CREATE_EMPLOYEE_ERROR_ISLOADING
} from './types';
import config from '../config/index';
import routes from '../constants/routes';

const createEmployee = data => ({
  type: CREATE_EMPLOYEE_SUCCESS,
  data
});

const setEmployeeError = error => ({
  type: CREATE_EMPLOYEE_ERROR,
  error
});

const createEmployeeIsLoading = () => ({
  type: CREATE_EMPLOYEE_ERROR_ISLOADING
});

export const deleteEmployeeError = () => ({
  type: DELETE_CREATE_EMPLOYEE_ERROR
});

const postEmployee = details => (dispatch) => {
  dispatch(createEmployeeIsLoading());
  return axios.post(`${config.apiUrl}${routes.CREATEEMPLOYEE}`, details).then((response) => {
    const { data } = response;
    dispatch(createEmployee(data));
    toastr.success(data.message);
  }).catch((error) => {
    if (error.response === undefined) {
      dispatch(setEmployeeError('Ooops! something went wrong please check your internet connection'));
      throw error;
    } else {
      const { data } = error.response;
      dispatch(setEmployeeError(data.message));
    }
  });
};

export default postEmployee;
