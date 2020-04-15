import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'is-empty';
import {
  Form,
  Button,
  Card
} from 'react-bootstrap';
import TextField from './TextField';
import { userInputAdmin } from '../middleware/userValidation';
import postAdmin, { deleteAdminError } from '../actions/createAdmin';
import ErrorAlertNotification from './ErrorAlertNotification';
import loginAdminRequest, { deleteLoginAdminError } from '../actions/loginAdmin';

/**
 * @class AdminForm
 */
class AdminForm extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  /**
  *
  *@param {*} event
  *@returns {*} - state
  */
 onChange = (event) => {
   const { errors } = this.state;
   if (errors[event.target.name]) {
     const newErrors = Object.assign({}, errors);
     delete newErrors[event.target.name];
     this.setState({
       [event.target.name]: event.target.value,
       errors: newErrors
     });
   } else {
     this.setState({
       [event.target.name]: event.target.value
     });
   }
 }

 /**
  *
  *@returns {*} - payload
  */
 onSubmit = () => {
   const {
     type,
     PostAdmin,
     LoginAdminRequest
   } = this.props;
   if (this.isValid()) {
     this.setState({ errors: {} });
     if (type !== 'login') {
       PostAdmin(this.state);
     } else {
       LoginAdminRequest(this.state);
     }
   }
 }

 isValid = () => {
   const { errors, isValid } = userInputAdmin(
     this.state
   );
   if (!isValid) {
     this.setState({ errors });
   }
   return isValid;
 }

 delayReload = () => {
   window.location.reload();
 }

 /**
   *
   * @returns {*} - empty strings
   */
  handleDelete = () => {
    const { type } = this.state;
    if (type !== 'login') {
      const { DeleteAdminError } = this.props;
      DeleteAdminError();
    } else {
      const { DeleteLoginAdminError } = this.props;
      DeleteLoginAdminError();
    }
  }

  /**
   *
   * @returns {*} - render
   */
  render() {
    const {
      email,
      password,
      errors
    } = this.state;

    const {
      type,
      createAdminIsLoading,
      createAdminSuccess,
      adminError,
      loginAdminError,
      loginAdminIsLoading,
      loginAdminSuccess
    } = this.props;

    if (createAdminSuccess) {
      setTimeout(this.delayReload, 1000);
    }

    if (loginAdminSuccess) {
      setTimeout(this.delayReload, 1000);
    }

    const error = type !== 'login' ? adminError : loginAdminError;

    return (
      <>
        <Card.Body>
          <Card.Title>
            {
             type !== 'login' ? 'You can create an admin with this form' : 'You can login as an admin with this form'
           }
          </Card.Title>
          {!isEmpty(error) && (
          <ErrorAlertNotification
            errors={error}
            onClick={this.handleDelete}
          />
          )}
          <Form>
            <TextField
              onChange={this.onChange}
              value={email}
              error={errors.email}
              type="text"
              field="email"
              placeholder="myemail@mail.com"
              label="Email"
              onKeyPress={this.keyPressed}
            />
            <TextField
              onChange={this.onChange}
              value={password}
              error={errors.password}
              type="text"
              field="password"
              placeholder="Enter Password"
              label="Password"
              onKeyPress={this.keyPressed}
            />
            <Button
              variant="info"
              onClick={this.onSubmit}
            >
              {
            createAdminIsLoading || loginAdminIsLoading ? (
              <>
                <i className="fa fa-spinner fa-spin" />
                {'  '}
                Submit
              </>
            ) : 'Submit'
           }
            </Button>
          </Form>
        </Card.Body>
      </>
    );
  }
}

AdminForm.propTypes = {
  type: PropTypes.string,
  createAdminIsLoading: PropTypes.bool,
  createAdminSuccess: PropTypes.bool,
  adminError: PropTypes.string,
  loginAdminError: PropTypes.string,
  loginAdminIsLoading: PropTypes.bool,
  loginAdminSuccess: PropTypes.bool
};

const mapStateToProps = state => ({
  createAdminIsLoading: state.postAdmin.createAdminIsLoading,
  createAdminSuccess: state.postAdmin.createAdminSuccess,
  adminError: state.postAdmin.error,
  loginAdminIsLoading: state.loginAdmin.loginAdminIsLoading,
  loginAdminSuccess: state.loginAdmin.loginAdminSuccess,
  loginAdminError: state.loginAdmin.error
});

export default connect(mapStateToProps, {
  PostAdmin: postAdmin,
  DeleteAdminError: deleteAdminError,
  LoginAdminRequest: loginAdminRequest,
  DeleteLoginAdminError: deleteLoginAdminError
})(AdminForm);
