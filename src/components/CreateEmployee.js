import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from 'is-empty';
import {
  Form,
  Button,
  Card
} from 'react-bootstrap';
import TextField from './TextField';
import ErrorAlertNotification from './ErrorAlertNotification';
import { userInputCreateEmployee } from '../middleware/userValidation';
import Header from './Header';
import postEmployee, { deleteEmployeeError } from '../actions/createEmployee';

/**
 * @class LandingPage
 */
class CreateEmployee extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    department: '',
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
   const { PostEmployee } = this.props;
   if (this.isValid()) {
     this.setState({ errors: {} });
     PostEmployee(this.state);
   }
 }

 /**
   *
   * @returns {*} - empty strings
   */
  handleDelete = () => {
    const { DeleteEmployeeError } = this.props;
    DeleteEmployeeError();
  }

 isValid = () => {
   const { errors, isValid } = userInputCreateEmployee(
     this.state
   );
   if (!isValid) {
     this.setState({ errors });
   }
   return isValid;
 }

 /**
   *
   * @returns {*} - render
   */
 render() {
   const {
     firstName,
     lastName,
     email,
     department,
     errors
   } = this.state;
   const {
     isLoading,
     error,
     success
   } = this.props;

   if (success) {
     return <Redirect to="/" />
   }
   return (
     <div className="dashboard_body px-5">
       <Header />
       <div className="container">
         <Card>
           <Card.Header>Create an Employee</Card.Header>
           <Card.Body>
             <Card.Title>You can create an employee with this form</Card.Title>
             {!isEmpty(error) && (
             <ErrorAlertNotification
               errors={error}
               onClick={this.handleDelete}
             />
             )}
             <Form>
               <TextField
                 onChange={this.onChange}
                 value={firstName}
                 error={errors.firstName}
                 type="text"
                 field="firstName"
                 placeholder="Enter First Name"
                 label="First Name"
                 onKeyPress={this.keyPressed}
               />
               <TextField
                 onChange={this.onChange}
                 value={lastName}
                 error={errors.lastName}
                 type="text"
                 field="lastName"
                 placeholder="Enter Last Name"
                 label="Last Name"
                 onKeyPress={this.keyPressed}
               />
               <TextField
                 onChange={this.onChange}
                 value={email}
                 error={errors.email}
                 type="text"
                 field="email"
                 placeholder="myemail@email.com"
                 label="Email"
                 onKeyPress={this.keyPressed}
               />
               <TextField
                 onChange={this.onChange}
                 value={department}
                 error={errors.department}
                 type="text"
                 field="department"
                 placeholder="department"
                 label="Department"
                 onKeyPress={this.keyPressed}
               />
               <Button
                 variant="info"
                 onClick={this.onSubmit}
               >
                 {
             isLoading ? (
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
         </Card>
       </div>
     </div>
   );
 }
}

CreateEmployee.propTypes = {
  PostEmployee: PropTypes.func,
  isLoading: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.string,
  DeleteEmployeeError: PropTypes.func,
};

const mapStateToProps = state => ({
  isLoading: state.postEmployee.createEmployeeIsLoading,
  success: state.postEmployee.createEmployeeSuccess,
  error: state.postEmployee.error
});

export default connect(mapStateToProps, {
  PostEmployee: postEmployee,
  DeleteEmployeeError: deleteEmployeeError
})(CreateEmployee);
