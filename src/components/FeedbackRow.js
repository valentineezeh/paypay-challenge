import React, { Component } from 'react';
import datetime from 'node-datetime';
import PropTypes from 'prop-types';

/**
 * @class FeedbackRow
 */
class FeedbackRow extends Component {
  /**
   *
   * @returns {*} - render
   */
  render() {
    const { feedback } = this.props;
    console.log('check this', feedback);
    return (
      <>
        <tr className="header_two_child_two">
          <td>{feedback._id}</td>
          <td>{feedback.feedback}</td>
          <td>
            { datetime.create(feedback.createdAt).format('m/d/y') }
          </td>
        </tr>
      </>
    );
  }
}

FeedbackRow.propTypes = {
  feedback: PropTypes.shape({
    createdAt: PropTypes.string,
    _id: PropTypes.string,
    feedback: PropTypes.string,
  })
}

export default FeedbackRow;
