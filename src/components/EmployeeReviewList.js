/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Accordion,
  Card,
  Button,
  Dropdown,
  DropdownButton,
  Modal,
} from 'react-bootstrap';
import datetime from 'node-datetime';
import FeedbackList from './EmployeeFeedBackList';
import FeedbackForm from './FeedbackForm';

/**
 * @class EmployeeReviewList
 */
class EmployeeReviewList extends Component {
  state = {
    show: false,
  }

  /**
   *
   * @returns {*} - bool
   */
  handleClose = () => {
    this.setState({ show: false });
  };

  /**
  *
  *@param {*} reviewId
  *@param {*} employeeId
  *@returns {*} - state
  */
  handleShow = (reviewId, employeeId) => {
    this.setState({
      show: true,
      reviewId,
      employeeId
    });
  };

  /**
   *
   * @returns {*} - render
   */
  render() {
    const {
      show,
      reviewId,
      employeeId
    } = this.state;
    const { review } = this.props;
    return (
      <>
        <Accordion>
          <Card>
            <Card.Header>
              <div className="row justify-content-center">
                <div className="col-sm my-3 mr-0">
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="0"
                  >
                    <i className="fas fa-angle-down" />
                    <span className="header_two_child_two">
                      {'  '}
                      {review._id}
                    </span>
                  </Accordion.Toggle>
                </div>
                <div className="col-sm my-4 ml-0 header_two_child_two">
                  {review.employeeId}
                </div>
                <div className="col-sm my-3 header_two_child_two">
                  {review.review}
                </div>
                <div className="col-sm my-3 header_two_child_two">
                  { datetime.create(review.createdAt).format('m/d/y') }
                </div>
                <div className="col-sm my-3 ">
                  <DropdownButton
                    variant="success"
                  >
                    <Dropdown.Item
                      eventKey="1"
                      className="dropdown-text"
                      onClick={() => this.handleShow(review._id, review.employeeId)}
                    >
                      Give Feedback
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </Card.Header>
            <FeedbackList
              feedbacks={review.feedback}
            />
          </Card>
        </Accordion>
        <Modal
          show={show}
          onHide={this.handleClose}
          animation={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Give Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FeedbackForm
              reviewId={reviewId}
              employeeId={employeeId}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

EmployeeReviewList.propTypes = {
  review: PropTypes.shape({
    _id: PropTypes.string,
    createdAt: PropTypes.string,
    review: PropTypes.string,
    employeeId: PropTypes.string,
    feedback: PropTypes.array,
  })
};

export default EmployeeReviewList;
