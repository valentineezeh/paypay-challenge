/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import getEmployees from '../actions/getEmployees';
import EmptyPage from './EmptyPage';
import Header from './Header';
import AdminView from './AdminView';
import EmployeeView from './EmployeeView';

/**
 * @class LandingPage
 */
class LandingPage extends Component {
  // Get all gateways
  componentDidMount = () => {
    const { GetEmployees } = this.props;
    GetEmployees();
  }

  /**
   *
   * @returns {*} - render
   */
  render() {
    const {
      employeePayload,
      employeeIsLoading,
      auth,
      reviews
    } = this.props;
    return (
      <div>
        <div className="dashboard_body px-5">
          <Header />
          {
            employeeIsLoading ? (
              <div className="text-center py-5">
                <Loader
                  type="Circles"
                  color="#99BF16"
                  height="100"
                  width="100"
                />
              </div>
            ) : employeePayload.length === 0 ? (
              <EmptyPage />
            ) : (
              <>
                {
                  auth ? (
                    <AdminView employeePayload={employeePayload} />
                  ) : (
                    <EmployeeView
                      reviews={reviews}

                    />
                  )
                }
              </>
            )
          }
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  GetEmployees: PropTypes.func,
  employeePayload: PropTypes.array,
  employeeIsLoading: PropTypes.bool
};

const mapStateToProps = state => ({
  employeePayload: state.getEmployees.allEmployees,
  reviews: state.getEmployees.reviews,
  employeeIsLoading: state.getEmployees.isLoading,
  auth: state.loginAdmin.isAuthenticated,
});

export default connect(mapStateToProps, {
  GetEmployees: getEmployees
})(LandingPage);
