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
import getReviews from '../actions/getReviews';
import ReviewList from './ReviewList';
import ReviewForm from './CreateReview';

/**
 * @class EmployeeList
 */
class EmployeeList extends Component {
  state = {
    show: false,
    id: ''
  }

  /**
   *
   * @returns {*} - bool
   */
  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = (employeeId) => {
    this.setState({ show: true, id: employeeId });
  };

  getId = (employeeId) => {
    this.setState({ id: employeeId });
    const { GetReviews } = this.props;
    GetReviews(employeeId);
  }


  /**
   *
   * @returns {*} - render
   */
  render() {
    const { show, id } = this.state;
    const {
      employee,
      auth,
    } = this.props;
    return (
      <div>
        <Accordion>
          <Card>
            <Card.Header>
              <div className="row justify-content-center">
                <div className="col-sm my-3">
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="0"
                    onClick={
                      () => this.getId(employee._id)
                    }
                  >
                    <i className="fas fa-angle-down" />
                    <span className="header_two_child_two">
                      {'  '}
                      {employee._id}
                    </span>
                  </Accordion.Toggle>
                </div>
                <div className="col-sm my-3 header_two_child_two">
                  {
                    `${employee.firstName} ${employee.lastName}`
                    }
                </div>
                <div className="col-sm my-3 header_two_child_two">
                  {employee.department}
                </div>
                <div className="col-sm my-3 header_two_child_two">
                  {employee.email}
                </div>
                <div className="col-sm my-3 header_two_child_two">
                  { datetime.create(employee.createdAt).format('m/d/y') }
                </div>
                <div className="col-sm my-3 ">
                  {
                    auth ? (
                      <DropdownButton
                        variant="success"
                      >
                        <Dropdown.Item
                          eventKey="1"
                          className="dropdown-text"
                          onClick={() => this.handleShow(employee._id)}
                        >
                          Give Review
                        </Dropdown.Item>
                      </DropdownButton>
                    ) : ''
                  }
                </div>
              </div>
            </Card.Header>
            <ReviewList
              review={employee.reviews}
              employeeId={id}
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
            <Modal.Title>Give Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReviewForm employeeId={id} />
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}

EmployeeList.propTypes = {
  employee: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    department: PropTypes.string,
    email: PropTypes.string,
    createdAt: PropTypes.string,
    reviews: PropTypes.array,
    _id: PropTypes.string
  }),
  GetReviews: PropTypes.func,
  reviewPayload: PropTypes.shape({}),
  auth: PropTypes.bool
};

const mapStateToProps = state => ({
  reviewPayload: state.getReviews.allReviews,
  reviewIsLoading: state.getReviews.reviewIsLoading,
  auth: state.loginAdmin.isAuthenticated,
});

export default connect(mapStateToProps, {
  GetReviews: getReviews
})(EmployeeList);
