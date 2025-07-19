import { Switch as HeadlessSwitch, SwitchGroup } from "@headlessui/react"; // ✅ Import SwitchGroup
import classNames from "classnames";
import React from "react";
import "./ToggleSwitch.css";

export const ToggleSwitch = ({
  label,
  checked,
  onChange,
  labelPosition = "right",
  error,
  ...props
}) => {
  return (
    <div className="switch-container">
      {/* ✅ Wrap everything in a SwitchGroup */}
      <SwitchGroup as="div" className="switch-group">
        {label && labelPosition === "left" && (
          <HeadlessSwitch.Label className="switch-label" passive>
            {label}
          </HeadlessSwitch.Label>
        )}

        <HeadlessSwitch
          checked={checked}
          onChange={onChange}
          className={classNames("switch-element", {
            // Renamed from switch-wrapper
            "switch-element--error": !!error,
          })}
          {...props}
        >
          <span aria-hidden="true" className="switch-thumb" />
        </HeadlessSwitch>

        {label && labelPosition === "right" && (
          <HeadlessSwitch.Label className="switch-label" passive>
            {label}
          </HeadlessSwitch.Label>
        )}
      </SwitchGroup>
      {error && <p className="switch-error-message">{error}</p>}
    </div>
  );
};
