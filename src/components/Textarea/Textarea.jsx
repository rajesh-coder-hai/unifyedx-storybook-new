import React, { useState } from "react";
import classNames from "classnames";
import "./Textarea.css";

export const Textarea = ({
  label,
  id,
  error,
  className,
  ref,
  maxLength, // ✅ New prop for max length
  showCharCount = false, // ✅ New prop to control visibility
  ...props
}) => {
  const textareaId = id || props.name;

  // State to track the current length of the input
  const [currentLength, setCurrentLength] = useState(
    props.value?.length || props.defaultValue?.length || 0
  );

  // Wrapper for the onChange event to update our character count
  const handleOnChange = (e) => {
    setCurrentLength(e.target.value.length);
    // Call the original onChange from RHF or other props, if it exists
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const charsRemaining = maxLength - currentLength;

  return (
    <div className={`textarea-wrapper ${className || ""}`}>
      <div className="textarea-header">
        {label && (
          <label htmlFor={textareaId} className="textarea-label">
            {label}
          </label>
        )}
        {/* The character counter, only shown if props are set */}
        {showCharCount && maxLength && (
          <span className="char-counter">
            {charsRemaining} characters remaining
          </span>
        )}
      </div>
      <textarea
        id={textareaId}
        ref={ref}
        className={classNames("textarea-field", {
          "textarea-field--error": !!error,
        })}
        maxLength={maxLength} // Pass maxLength to the native element
        onChange={handleOnChange} // Use our wrapped onChange handler
        {...props}
      />
      {error && <p className="textarea-error-message">{error}</p>}
    </div>
  );
};
