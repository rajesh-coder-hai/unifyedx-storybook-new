/* eslint-disable react/prop-types */
import classNames from "classnames";
import { LoaderCircle } from "lucide-react"; // ✅ Import from lucide-react
import "./UnifyedCoreButton.css"; // ✅ Import the stylesheet

const sizeClasses = {
  small: "btn-sm",
  medium: "btn-md",
  large: "btn-lg",
};

const categoryClasses = {
  primary: "btn-primary",
  secondary: "btn-secondary",
};

export const UnifyedCoreButton = ({
  dataTestId,
  title,
  type = "button",
  ariaLabel,
  className = "", // ✅ Default is now empty
  loader = false,
  category = "primary",
  icon: Icon, // Renamed for clarity, expecting a component type e.g., CheckCircle
  disabled = false,
  size = "medium",
  label,
  onClick,
  ...props
}) => {
  const isButtonDisabled = disabled || loader;
  const isIconOnly = Icon && !label;

  const combinedClasses = classNames(
    "btn-base",
    sizeClasses[size],
    categoryClasses[category],
    {
      "is-loading": loader,
      "btn-icon-only": isIconOnly,
    },
    className
  );

  const buttonTitle =
    title ||
    (isIconOnly && ariaLabel) ||
    (typeof label === "string" ? label : undefined);
  const buttonAriaLabel =
    ariaLabel ||
    (isIconOnly && title) ||
    (typeof label === "string" ? label : undefined);

  return (
    <button
      data-testid={dataTestId}
      type={type}
      className={combinedClasses}
      disabled={isButtonDisabled}
      onClick={onClick}
      title={buttonTitle}
      aria-label={buttonAriaLabel}
      {...props}
    >
      {loader ? (
        <LoaderCircle className="loader-spin" data-testid="button-loader" />
      ) : (
        <>
          {Icon && <Icon size={size === "large" ? 20 : 16} />}
          {label}
        </>
      )}
    </button>
  );
};
