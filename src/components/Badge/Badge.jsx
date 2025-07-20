import React from "react";
import { X } from "lucide-react";
import classNames from "classnames";
import "./Badge.css";

export const Badge = ({
  label,
  variant = "default", // 'default', 'primary', 'success', 'warning', 'danger'
  size = "medium", // 'small', 'medium', 'large'
  icon: Icon,
  onRemove,
  bgColor,
  textColor,
  className,
  ...props
}) => {
  const badgeClasses = classNames(
    "badge",
    `badge--variant-${variant}`,
    `badge--size-${size}`,
    { "badge--with-remove": !!onRemove },
    className
  );

  // Use custom colors if provided, otherwise the CSS classes will apply the variant colors
  const customStyles =
    bgColor && textColor
      ? {
          backgroundColor: bgColor,
          color: textColor,
          borderColor: "transparent",
        }
      : {};

  return (
    <span className={badgeClasses} style={customStyles} {...props}>
      {Icon && <Icon className="badge-icon" />}
      <span className="badge-label">{label}</span>
      {onRemove && (
        <button
          type="button"
          className="badge-remove-button"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
        >
          <X className="badge-remove-icon" />
        </button>
      )}
    </span>
  );
};
