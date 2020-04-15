import React, { Component } from 'react';
import {
  Form,
  Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import isEmpty from 'is-empty';
import PropTypes from 'prop-types';
import TextField from './TextField';
import { userInputCreateFeedback } from '../middleware/userValidation';
import postFeedback, { deleteFeedbackError } from '../actions/createFeedback';
import ErrorAlertNotification from './ErrorAlertNotification';

/**
 * @class FeedbackForm
 */
class FeedbackForm extends Component {
  state = {
    feedback: '',
    errors: {},
    isLoading: false
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
   * @returns {*} - empty strings
   */
  handleDelete = () => {
    const { DeleteFeedbackError } = this.props;
    DeleteFeedbackError();
  }

 /**
  *
  *@returns {*} - payload
  */
 onSubmit = () => {
   const {
     PostFeedback,
     reviewId,
     employeeId
   } = this.props;
   const {
     feedback
   } = this.state;
   if (this.isValid()) {
     const payload = {
       reviewId,
       employeeId,
       feedback
     };
     this.setState({ errors: {} });
     PostFeedback(payload);
   }
 }

 isValid = () => {
   const { errors, isValid } = userInputCreateFeedback(
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
   * @returns {*} - render
   */
 render() {
   const {
     feedback,
     errors
   } = this.state;
   const {
     error,
     isLoading,
     success
   } = this.props;

   if (success) {
     setTimeout(this.delayReload, 2000);
   }

   return (
     <>
       <Form>
         {!isEmpty(error) && (
         <ErrorAlertNotification
           errors={error}
           onClick={this.handleDelete}
         />
         )}

         <TextField
           onChange={this.onChange}
           value={feedback}
           error={errors.feedback}
           type="text"
           field="feedback"
           placeholder="Enter feedback"
           label="Feedback"
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
     </>
   );
 }
}

FeedbackForm.propTypes = {
  error: PropTypes.string,
  PostFeedback: PropTypes.func,
  isLoading: PropTypes.bool,
  success: PropTypes.bool,
  reviewId: PropTypes.string,
  employeeId: PropTypes.string,
};

const mapStateToProps = state => ({
  isLoading: state.postFeedback.createFeedbackIsLoading,
  error: state.postFeedback.error,
  success: state.postFeedback.createFeedbackSuccess
});

export default connect(mapStateToProps, {
  PostFeedback: postFeedback,
  DeleteFeedbackError: deleteFeedbackError
})(FeedbackForm);
