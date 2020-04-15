/* eslint-disable prefer-spread */
import axios from 'axios';
import config from '../config';
import routes from '../constants/routes';
import {
  GET_EMPLOYEES_LIST_SUCCESS,
  GET_EMPLOYEES_LIST_ISLOADING
} from './types';

const employees = (data, reviews) => ({
  type: GET_EMPLOYEES_LIST_SUCCESS,
  data,
  reviews
});

const isLoading = () => ({
  type: GET_EMPLOYEES_LIST_ISLOADING
});

const getEmployees = () => (dispatch) => {
  dispatch(isLoading());
  return axios.get(`${config.apiUrl}${routes.GETEMPLOYEES}`).then((response) => {
    const { data } = response;

    const reviews = data.data.map((i) => i.reviews);

    const merged = [].concat.apply([], reviews);

    dispatch(employees(data.data, merged));
  }).catch(error => error);
};

export default getEmployees;
