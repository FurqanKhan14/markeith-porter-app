import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const TextInput = ({
  id,
  type,
  value = '',
  className,
  placeholder,
  label,
  labelClassName = 'mb-2',
  disabled,
  readOnly = false,
  required,
  rows,
  name,
  onChange,
  onBlur,
  autoComplete,
  error, // ✅ already includes touched logic
  inputIcon,
  iconPosition = 'left',
  inline = false,
  ...rest
}) => {
  const [passwordShow, setPasswordShow] = React.useState(true);

  const handlePasswordToggle = () => setPasswordShow((prev) => !prev);

  const handleResetTime = (e) => {
    e.preventDefault();
    if (onChange) {
      const event = {
        target: {
          name: name || id,
          value: '',
        },
      };
      onChange(event);
    }
  };

  const inputProps = {
    id,
    name,
    autoComplete,
    onChange: onChange || (() => {}),
    onBlur,
    disabled,
    readOnly,
    placeholder,
    value: value !== undefined ? value : '',
    className: `form-control ${className || ''} ${
      inputIcon ? `has-icon-${iconPosition}` : ''
    } ${error ? 'is-invalid' : ''}`,
    type: type === 'password' ? (passwordShow ? 'password' : 'text') : type,
    'aria-invalid': !!error,
    ...(type === 'textarea' ? { rows } : {}),
    ...rest,
  };

  const labelText = label && (
    <label className={`form-label ${labelClassName || ''}`} htmlFor={id || name}>
      {label}
      {required && <span className="text-danger">*</span>}
    </label>
  );

  const inputElement =
    type === 'textarea' ? <textarea {...inputProps} /> : <input {...inputProps} />;

  const iconElement =
    inputIcon &&
    (typeof inputIcon === 'function'
      ? React.createElement(inputIcon, {
          className: `input-icon icon-${iconPosition}`,
        })
      : (
        <FontAwesomeIcon
          className={`input-icon icon-${iconPosition}`}
          icon={inputIcon}
        />
      ));

  const passwordToggleButton = type === 'password' && (
    <button
      type="button"
      className="btn view-btn show-btn-1 position-absolute"
      onClick={handlePasswordToggle}
    >
      <FontAwesomeIcon icon={passwordShow ? faEyeSlash : faEye} />
    </button>
  );

  const resetTimeButton = type === 'time' && value && (
    <button
      type="button"
      className="reset-time-btn position-absolute"
      onClick={handleResetTime}
    >
      ×
    </button>
  );

  const wrapperClass = type === 'password' ? 'passField-wrap' : 'inputField-wrap';

  const dateOrTimePlaceholder =
    (type === 'date' || type === 'time') &&
    (!value ? (
      <span className={`${type}-placeholder`}>
        {placeholder || `Select a ${type}`}
      </span>
    ) : (
      <span className="selected-value">{value}</span>
    ));

  const inlineForm = (
    <div className="d-flex align-items-center inline-form">
      {labelText}
      <div className={`${wrapperClass} position-relative`}>
        {iconPosition === 'left' && iconElement}
        {inputElement}
        {dateOrTimePlaceholder}
        {iconPosition === 'right' && iconElement}
        {passwordToggleButton}
        {resetTimeButton}
      </div>
    </div>
  );

  return (
    <>
      {inline ? (
        inlineForm
      ) : (
        <>
          {labelText}
          <div className={`${wrapperClass} position-relative`}>
            {iconPosition === 'left' && iconElement}
            {inputElement}
            {dateOrTimePlaceholder}
            {iconPosition === 'right' && iconElement}
            {passwordToggleButton}
            {resetTimeButton}
          </div>
        </>
      )}
      {error && (
        <div className="error-message text-danger fw-light ps-3 pt-1">
          {error}
        </div>
      )}
    </>
  );
};

export default TextInput;
