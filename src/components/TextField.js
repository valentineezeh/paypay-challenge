import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Form } from 'react-bootstrap';

const TextField = ({
  field,
  value,
  error,
  type,
  onChange,
  onBlur,
  id,
  placeholder,
  style,
  className,
  label,
  disabled,
  onKeyPress
}) => (
  <div className={classnames({ 'text-danger': error })}>
    <Form.Group controlId="formBasicAddress">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        style={style}
        type={type}
        name={field}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        id={id}
        className={className}
        disabled={disabled}
        onKeyPress={onKeyPress}
      />
    </Form.Group>
    {
    error && (
      <>
        <p className="text-danger">
          <i className="fas fa-exclamation-triangle" />
          &nbsp;
          {error}
        </p>
      </>
    )
  }
  </div>
);

TextField.propTypes = {
  field: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onKeyPress: PropTypes.func,
};

export default TextField;
