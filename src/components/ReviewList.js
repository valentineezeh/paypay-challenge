import React, { Component } from 'react';
import {
  Accordion,
  Table,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReviewRow from './ReviewRow';

/**
 * @class ReviewList
 */
class ReviewList extends Component {
  /**
   *
   * @returns {*} - render
   */
  render() {
    const { review, employeeId } = this.props;
    return (
      <div>
        <Accordion.Collapse eventKey="0">
          <Table responsive striped bordered hover>
            <thead>
              <tr className="header_two_child_two">
                <th>Review Id</th>
                <th>Review</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                review.map(i => (
                  <ReviewRow
                    key={i._id}
                    review={i}
                    employeeId={employeeId}
                  />
                ))
              }
            </tbody>
          </Table>
        </Accordion.Collapse>
      </div>
    );
  }
}

ReviewList.propTypes = {
  review: PropTypes.shape({}),
  employeeId: PropTypes.string,
};

export default ReviewList;
