/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmployeeReviewList from './EmployeeReviewList';
import EmptyPage from './EmptyPage';

/**
 * @class EmployeeView
 */
class EmployeeView extends Component {
  /**
   *
   * @returns {*} - render
   */
  render() {
    const { reviews } = this.props;
    return (
      <>
        {
          reviews.length === 0 ? (
            <EmptyPage />
          ) : (
            <>
              <div className="container-fluid">
                <div className="row align-items-center top_header">
                  <div className="col-sm my-3 top_header_content">
                    Review Id
                  </div>
                  <div className="col-sm my-3 top_header_content">
                    Employee Id
                  </div>
                  <div className="col-sm my-3 ml-5 top_header_content">
                    Review
                  </div>
                  <div className="col-sm my-3 top_header_content">
                    Created At
                  </div>
                  <div className="col-sm my-3 top_header_content">
                    Action
                  </div>
                </div>
              </div>
              <div>
                {
            reviews.map(review => (
              <EmployeeReviewList
                key={review._id}
                review={review}
              />
            ))
          }
              </div>
            </>
          )
        }
      </>
    );
  }
}

EmployeeView.propTypes = {
  reviews: PropTypes.shape([]),
};

export default EmployeeView;
