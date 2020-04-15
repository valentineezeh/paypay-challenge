import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * @class Navigation
 */
class Navigation extends Component {
  /**
   *
   * @returns {*} - render
   */
  render() {
    const { auth } = this.props;
    return (
      <>
        <nav className="main_side_nav">
          <span className="open_slide">
            <a id="side_menu_button" href="?#" onClick="openSideMenu()">
              <svg width="30" height="30">
                <path d="M0,5 30,5" stroke="#286a8e" strokeWidth="5" />
                <path d="M0,14 30,14" stroke="#286a8e" strokeWidth="5" />
                <path d="M0,23 30,23" stroke="#286a8e" strokeWidth="5" />
              </svg>
            </a>
          </span>
        </nav>

        <div className="side_nav">
          <div className="side_links">
            <ul>
              <li>
                <NavLink
                  exact
                  to="/"
                  activeClassName="active"
                >
                  Employees
                </NavLink>

              </li>
              <li>
                {
                  auth ? (
                    <NavLink
                      exact
                      to="/create-employee"
                      activeClassName="active"
                    >
                      Create Employee
                    </NavLink>
                  ) : ''
                }
              </li>
            </ul>
          </div>

          <div className="sideNav_footer">

            <p>
              2020 | Copyright - Gateway-service
            </p>

          </div>
        </div>
      </>
    );
  }
}

Navigation.propTypes = {
  auth: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.loginAdmin.isAuthenticated,
});

export default connect(mapStateToProps, null)(Navigation);
