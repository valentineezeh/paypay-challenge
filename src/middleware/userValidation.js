/* eslint-disable no-restricted-globals */
import isEmpty from 'is-empty';

const userInputCreateEmployee = (data) => {
  const errors = {};
  if (data.firstName === '' || !data.firstName || data.firstName.trim().length === 0) {
    errors.firstName = 'This field is required.';
  }

  if (data.lastName === '' || !data.lastName || data.lastName.trim().length === 0) {
    errors.lastName = 'This field is required.';
  }

  if (data.email === '' || !data.email || data.email.trim().length === 0) {
    errors.email = 'This field is required.';
  }

  if (data.department === '' || !data.department || data.department.trim().length === 0) {
    errors.department = 'This field is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const userInputCreateReview = (data) => {
  const errors = {};
  if (data.review === '' || !data.review || data.review.trim().length === 0) {
    errors.review = 'This field is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

const userInputAdmin = (data) => {
  const errors = {};
  if (data.email === '' || !data.email || data.email.trim().length === 0) {
    errors.email = 'This field is required.';
  }

  if (data.password === '' || !data.password || data.password.trim().length === 0) {
    errors.password = 'This field is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const userInputCreateFeedback = (data) => {
  const errors = {};
  if (data.feedback === '' || !data.feedback || data.feedback.trim().length === 0) {
    errors.feedback = 'This field is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

export {
  userInputCreateEmployee,
  userInputCreateReview,
  userInputAdmin,
  userInputCreateFeedback
};
