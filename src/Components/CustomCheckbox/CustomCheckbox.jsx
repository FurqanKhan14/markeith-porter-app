import React from 'react';
import './CustomCheckbox.css';

const CustomCheckbox = ({
  label,
  checked,
  onChange,
  name,
  readOnly,
  style = {},
}) => {
  return (
    <label
      className={`fw-regular checkbox-wrapper cp checkbox-component-wrapper ${
        readOnly ? 'readonly' : ''
      }`}
      style={style}
    >
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={checked}
          onChange={readOnly ? undefined : onChange}
          name={name}
          readOnly={readOnly}
          disabled={readOnly}
        />
        <span className="custom-checkbox"></span>
      </div>
      <span className="checkbox-label fw-normal">{label}</span>
    </label>
  );
};

export default CustomCheckbox;
