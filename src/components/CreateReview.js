/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'is-empty';
import TextField from './TextField';
import { userInputCreateReview } from '../middleware/userValidation';
import postReview, { deleteReviewError } from '../actions/createReview';
import ErrorAlertNotification from './ErrorAlertNotification';

/**
 * @class ReviewForm
 */
class ReviewForm extends Component {
  state = {
    review: '',
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
  *@returns {*} - payload
  */
 onSubmit = () => {
   const { PostReview, employeeId } = this.props;
   const {
     review
   } = this.state;
   if (this.isValid()) {
     const payload = {
       review,
       employeeId
     };
     this.setState({ errors: {} });
     PostReview(payload);
   }
 }

 /**
   *
   * @returns {*} - empty strings
   */
  handleDelete = () => {
    const { DeleteReviewError } = this.props;
    DeleteReviewError();
  }

 isValid = () => {
   const { errors, isValid } = userInputCreateReview(
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
    review,
    errors
  } = this.state;

  const {
    error,
    isLoading,
    success,
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
           value={review}
           error={errors.review}
           type="text"
           field="review"
           placeholder="Enter feedback"
           label="Review"
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

ReviewForm.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  PostReview: PropTypes.func,
  success: PropTypes.bool,
  DeleteReviewError: PropTypes.func,
  employeeId: PropTypes.string
};

const mapStateToProps = state => ({
  success: state.postReview.createReviewSuccess,
  isLoading: state.postReview.createReviewIsLoading,
  error: state.postReview.error
});

export default connect(mapStateToProps, {
  PostReview: postReview,
  DeleteReviewError: deleteReviewError
})(ReviewForm);
