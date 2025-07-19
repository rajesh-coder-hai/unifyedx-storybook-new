import React, { useId } from "react";
import classNames from "classnames";
import { Check } from "lucide-react";
import "./Checkbox.css";

export const Checkbox = ({
  label,
  id,
  error,
  className,
  ref,
  checked,
  onChange,
  ...props
}) => {
  const autoId = useId();
  const checkboxId = id || autoId;

  return (
    <div className={`checkbox-container ${className || ""}`}>
      {/* ✅ The <label> is now the main wrapper for interactive elements */}
      <label htmlFor={checkboxId} className="checkbox-wrapper">
        <input
          id={checkboxId}
          type="checkbox"
          ref={ref}
          className="checkbox-input"
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <div
          className={classNames("checkbox-box", {
            "checkbox-box--checked": checked,
            "checkbox-box--error": !!error,
          })}
          // Add aria-hidden so screen readers don't announce the div
          aria-hidden="true"
        >
          {checked && <Check className="checkbox-check-icon" />}
        </div>
        {/* The label text is now a simple span inside the main label */}
        {label && <span className="checkbox-label-text">{label}</span>}
      </label>
      {error && <p className="checkbox-error-message">{error}</p>}
    </div>
  );
};
