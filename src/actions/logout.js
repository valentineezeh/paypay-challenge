import toastr from 'toastr';
import { LOGOUT_USER } from './types';

export const logoutCurrentUser = () => ({
  type: LOGOUT_USER
});

const logoutAction = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logoutCurrentUser({}));
  toastr.success('Goodbye! Come again soon.');
};

export default logoutAction;
