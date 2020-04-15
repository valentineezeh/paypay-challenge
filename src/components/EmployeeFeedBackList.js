import React, { Component } from 'react'
import {
  Accordion,
  Table,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import FeedbackRow from './FeedbackRow';
 
/**
 * @class FeedbackList
 */
class FeedbackList extends Component {
  /**
   *
   * @returns {*} - render
   */
  render() {
    const { feedbacks } = this.props;
    return (
      <div>
        <Accordion.Collapse eventKey="0">
          <Table responsive striped bordered hover>
            <thead>
              <tr className="header_two_child_two">
                <th>Feedback Id</th>
                <th>Feedback</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {
                feedbacks.map(i => (
                  <FeedbackRow
                    key={i._id}
                    feedback={i}
                  />
                ))
              }
            </tbody>
          </Table>
        </Accordion.Collapse>
      </div>
    )
  }
}

FeedbackList.propTypes = {
  feedbacks: PropTypes.shape({})
}

export default FeedbackList;
