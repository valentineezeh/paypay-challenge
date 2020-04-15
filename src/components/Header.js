/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import {
  Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AdminForm from './AdminForm';
import logoutAction from '../actions/logout';


/**
 * @class Header
 */
class Header extends Component {
  state = {
    show: false,
    type: ''
  }

  onLogout = (e) => {
    const {
      LogoutAction,
      history
    } = this.props;
    e.preventDefault();
    LogoutAction(history.push('/'));
  }

  /**
   *
   * @returns {*} - bool
   */
  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = (action) => {
    this.setState({ show: true, type: action });
  };

  /**
   *
   * @returns {*} - render
   */
  render() {
    const { show, type } = this.state;
    const { auth, history } = this.props;
    return (
      <>
        <div className="row py-5 top_nav">
          <div className="col-md-12">
            <div className="d-flex">
              <div onClick={history.goBack} id="pointer">
                <i className="fas fa-long-arrow-alt-left mr-2" style={{ color: '#286a8e' }} />
                {' '}
                <span>Go Back</span>
              </div>
              {
              auth ? (
                <div className="ml-auto icons"
                  id="pointer"
                  onClick={this.onLogout}
                >
                  <i className="fas fa-sign-out-alt" />
                </div>
              ) : (
                <>
                  <div className="ml-auto icons"
                    id="pointer"
                    onClick={() => this.handleShow('login')}
                  >
                    {/* <div className="status_dot" /> */}
                    <i className="far fa-user-circle" />
                  </div>
                  <div className="ml-5 icons"
                    id="pointer"
                    onClick={() => this.handleShow('register')}
                  >
                    <i className="fas fa-user-plus" />
                  </div>
                </>
              )
            }
            </div>
          </div>
        </div>
        <div className="row mt-5 money-display">
          <div className="col-md-12 text-center mb-2 wallet_text">
            <p>
              Valentine Ezeh Employee Performance Reviews
            </p>
          </div>
          <div className="col-md-12 text-center product_review">
            <p className="m-0">
              Employees Review
            </p>
          </div>
          <div className="col-md-12 text-center total_amount">
            <span>
              Total Number of employees:
              {' '}
              {/* { employeePayload.length } */}
            </span>
          </div>
          <div className="col-md-12 text-center total_amount">
            <span>
              Reviews: Each review is allocated to an employee.
              {' '}
            </span>
          </div>
        </div>
        <Modal
          show={show}
          onHide={this.handleClose}
          animation={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Admin Auth</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AdminForm type={type} />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.bool,
  LogoutAction: PropTypes.func,
  history: PropTypes.shape({})
};

const mapStateToProps = state => ({
  auth: state.loginAdmin.isAuthenticated,
});

export default withRouter(connect(mapStateToProps, {
  LogoutAction: logoutAction
})(Header));
