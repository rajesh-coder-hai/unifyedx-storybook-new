import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import classNames from "classnames";
import { CheckCircle } from "lucide-react";
import React from "react";
import "./RadioGroup.css";

export const RadioGroup = ({
  label,
  value, // The currently selected option's value (e.g., 'work')
  onChange,
  options = [],
  error,
  ...props
}) => {
  return (
    <div className="radiogroup-wrapper">
      {label && <label className="radiogroup-label">{label}</label>}
      <HeadlessRadioGroup
        value={value}
        onChange={onChange}
        className="radiogroup-container"
        {...props}
      >
        {options.map((option) => (
          <HeadlessRadioGroup.Option
            key={option.value}
            value={option.value}
            className={({ active, checked }) =>
              classNames("radiogroup-option", {
                "radiogroup-option--active": active,
                "radiogroup-option--checked": checked,
                "radiogroup-option--error": !!error,
              })
            }
          >
            {({ checked }) => (
              <>
                <div className="radiogroup-option-content">
                  <HeadlessRadioGroup.Label as="p" className="option-label">
                    {option.label}
                  </HeadlessRadioGroup.Label>
                  {option.description && (
                    <HeadlessRadioGroup.Description
                      as="span"
                      className="option-description"
                    >
                      {option.description}
                    </HeadlessRadioGroup.Description>
                  )}
                </div>
                {checked && (
                  <div className="option-checkmark">
                    <CheckCircle size={20} />
                  </div>
                )}
              </>
            )}
          </HeadlessRadioGroup.Option>
        ))}
      </HeadlessRadioGroup>
      {error && <p className="radiogroup-error-message">{error}</p>}
    </div>
  );
};
