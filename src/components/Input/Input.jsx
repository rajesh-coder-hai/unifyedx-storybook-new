import React from "react";
import classNames from "classnames";
import "./Input.css";

// ✅ No more React.forwardRef wrapper. This is now a standard function component.
export const Input = ({
  label,
  id,
  type = "text",
  icon: Icon,
  error,
  className,
  ref, // ✅ 'ref' is now received directly as a prop
  ...props
}) => {
  const inputId = id || props.name;

  return (
    <div className={`input-wrapper ${className || ""}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <div className="input-field-container">
        {Icon && <Icon className="input-icon" size={20} />}
        <input
          id={inputId}
          type={type}
          ref={ref} // ✅ Apply the ref from props here
          className={classNames("input-field", {
            "input-field--error": !!error,
            "input-field--with-icon": !!Icon,
          })}
          {...props}
        />
      </div>
      {error && <p className="input-error-message">{error}</p>}
    </div>
  );
};
