import React from "react";
import classNames from "classnames";
import "./Spinner.css";

/**
 * A versatile spinner component with different sizes and colors.
 */
export const Spinner = ({
  size = "medium", // 'small', 'medium', 'large'
  color = "primary", // 'primary', 'white'
  className,
  ...props
}) => {
  const spinnerClasses = classNames(
    "spinner",
    `spinner--size-${size}`,
    `spinner--color-${color}`,
    className
  );

  return (
    <div
      className={spinnerClasses}
      {...props}
      role="status"
      aria-label="Loading..."
    >
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
    </div>
  );
};

/**
 * A full-screen loader for page/app level loading states.
 * It uses the Spinner component internally.
 */
export const FullScreenLoader = ({ label = "Loading..." }) => {
  return (
    <div className="fullscreen-loader-overlay" role="alert" aria-busy="true">
      <div className="loader-content">
        <Spinner size="large" />
        {label && <span className="loader-label">{label}</span>}
      </div>
    </div>
  );
};
