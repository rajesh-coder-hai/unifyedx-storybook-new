import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "./Tooltip.css";

export const Tooltip = ({
  children,
  content,
  variant = "dark", // 'dark', 'light', 'info', 'success', 'error'
  size = "medium", // 'small', 'medium'
  place = "top", // 'top', 'bottom', 'left', 'right'
  className, // For external styling of the tooltip itself
  ...props
}) => {
  // We need a unique ID to link the trigger element and the tooltip
  const tooltipId = React.useId();

  return (
    <>
      {/* 1. The trigger element */}
      {React.cloneElement(children, { "data-tooltip-id": tooltipId })}

      {/* 2. The Tooltip component itself */}
      <ReactTooltip
        id={tooltipId}
        content={content}
        place={place}
        variant={variant}
        className={`custom-tooltip custom-tooltip--size-${size} ${
          className || ""
        }`}
        {...props}
      />
    </>
  );
};
