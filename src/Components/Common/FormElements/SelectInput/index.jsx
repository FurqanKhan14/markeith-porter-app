import React, { forwardRef } from 'react';
import Form from 'react-bootstrap/Form';
import "./styles.css"


const SelectInput = forwardRef(({
  // Basic props
  name,
  id,
  label,
  value,
  onChange,
  onBlur,
  options = [],
  required = false,
  placeholder,
  
  // Styling props
  size = '',
  className = '',
  labelClassName = '',
  
  // Functionality props
  firstIsLabel = false,
  disabled = false,
  error,
  touched,
  
  // Additional props
  defaultValue,
  ...props
}, ref) => {
  
  const handleSelectChange = (event) => {
    if (onChange) {
      // Support both direct value and event object
      if (typeof onChange === 'function') {
        onChange(event);
      }
    }
  };

  // Process options for firstIsLabel functionality
  const selectOptions = firstIsLabel 
    ? [{ value: '', label: options[0]?.label || placeholder, disabled: true }, ...options.slice(1)] 
    : options;

  return (
   <>
      {/* Label */}
      {label && (
        <label 
          className={`form-label ${labelClassName}`} 
          htmlFor={id || name}
        >
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      {/* Select Dropdown */}
      <Form.Select
        ref={ref}
        name={name}
        id={id || name}
        value={value ?? ""}
        defaultValue={defaultValue}
        onChange={handleSelectChange}
        onBlur={onBlur}
        size={size}
        disabled={disabled}
        className={`${className} ${touched && error ? "is-invalid" : ""}`}
        aria-invalid={touched && error ? true : false}
        {...props}
      >
        {/* Placeholder */}
        {placeholder && !firstIsLabel && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        
        {/* Options */}
        {selectOptions.map((option, index) => {
          const optionValue = option.value || option;
          const optionLabel = option.text || option.label || option;
          const isDisabled = option.disabled || false;
          
          return (
            <option
              key={`${name}-${index}`}
              value={optionValue}
              disabled={isDisabled}
              className={
                optionLabel?.toLowerCase().startsWith('add new') 
                  ? 'text-center secondary-color' 
                  : ''
              }
            >
              {optionLabel}
            </option>
          );
        })}
      </Form.Select>

      {/* Error Message */}
      {touched && error && (
        <div className="error-message text-danger fw-light ps-3 pt-2">
          {error}
        </div>
      )}
    </>
   
  );
});

SelectInput.displayName = 'SelectInput';

export default SelectInput;
