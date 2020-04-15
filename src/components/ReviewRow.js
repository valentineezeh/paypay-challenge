/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import datetime from 'node-datetime';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import deleteEmployeeReview from '../actions/deleteReview';

/**
 * @class ReviewRow
 */
class ReviewRow extends Component {
  /**
  *
  *@param {*} reviewId
  *@param {*} employeeId
  *@returns {*} - payload
  */
  onDeleteReview = (reviewId, employeeId) => {
    const { DeleteEmployeeReview } = this.props;
    const payload = {
      employeeId,
      reviewId
    };
    DeleteEmployeeReview(payload);
  }

  /**
   *
   * @returns {*} - render
   */
  render() {
    const { review, auth } = this.props;
    return (
      <>
        <tr className="header_two_child_two">
          <td>{review._id}</td>
          <td>{review.review}</td>
          <td>
            { datetime.create(review.createdAt).format('m/d/y') }
          </td>
          <td>
            {
              auth ? (
                <Button
                  variant="danger"
                  onClick={() => this.onDeleteReview(review._id, review.employeeId)}
                >
                  <i className="far fa-trash-alt" />
                </Button>
              ) : ''
            }
          </td>
        </tr>
      </>
    );
  }
}

ReviewRow.propTypes = {
  review: PropTypes.shape({
    _id: PropTypes.string,
    review: PropTypes.string,
    createdAt: PropTypes.string,
    employeeId: PropTypes.string
  }),
  DeleteEmployeeReview: PropTypes.func,
};

const mapStateToProps = state => ({
  auth: state.loginAdmin.isAuthenticated,
});

export default connect(mapStateToProps, {
  DeleteEmployeeReview: deleteEmployeeReview
})(ReviewRow);
