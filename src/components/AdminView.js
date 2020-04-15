import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmployeeList from './EmployeeList';


/**
 * @class AdminView
 */
class AdminView extends Component {
  /**
   *
   * @returns {*} - render
   */
  render() {
    const { employeePayload } = this.props;
    return (
      <>
        <div className="container-fluid">
          <div className="row align-items-center top_header">
            <div className="col-sm my-3 top_header_content">
              Employee Id
            </div>
            <div className="col-sm my-3 top_header_content">
              Full Name
            </div>
            <div className="col-sm my-3 top_header_content">
              Department
            </div>
            <div className="col-sm my-3 top_header_content">
              Email
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
                    employeePayload.map(employee => (
                      <EmployeeList
                        key={employee._id}
                        employee={employee}
                      />
                    ))
                  }
        </div>
      </>
    );
  }
}

AdminView.propTypes = {
  employeePayload: PropTypes.shape({})
};

export default AdminView;
