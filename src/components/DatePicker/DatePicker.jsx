import { Calendar as CalendarIcon, X } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import classNames from "classnames";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import "react-day-picker/style.css";
import "./DatePicker.css";

// --- Single Date Picker ---
export const DatePicker = ({
  value,
  onChange,
  onClear,
  placeholder = "Select a date",
  label,
  error,
  disabled = false,
  className,
  ...props
}) => {
  const handleClear = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClear?.();
  };

  return (
    <div className={classNames("datepicker-wrapper", className)}>
      {label && (
        <label className="datepicker-label" htmlFor="datepicker-input">
          {label}
        </label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <div className="datepicker-input-container">
            <button
              id="datepicker-input"
              type="button"
              className={classNames("datepicker-trigger", {
                "datepicker-trigger--error": !!error,
                "datepicker-trigger--disabled": disabled,
              })}
              disabled={disabled}
              aria-label={
                value ? `Selected date is ${format(value, "PPP")}` : placeholder
              }
            >
              <CalendarIcon className="datepicker-icon" />
              {value ? (
                <span className="datepicker-value">{format(value, "PPP")}</span>
              ) : (
                <span className="datepicker-placeholder">{placeholder}</span>
              )}
            </button>
            {value && onClear && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="datepicker-clear-button"
                aria-label="Clear selected date"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="datepicker-popover-content" align="start">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
            disabled={disabled}
            {...props}
          />
        </PopoverContent>
      </Popover>
      {error && <p className="datepicker-error-message">{error}</p>}
    </div>
  );
};

// --- Date Range Picker ---
export const DateRangePicker = ({
  value,
  onChange,
  onClear,
  placeholder = "Select a date range",
  label,
  error,
  disabled = false,
  className,
  ...props
}) => {
  const from = value?.from;
  const to = value?.to;

  const handleClear = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClear?.();
  };

  const formattedRange =
    from && to ? (
      <>
        {format(from, "MMM d, y")} - {format(to, "MMM d, y")}
      </>
    ) : (
      <span className="datepicker-placeholder">{placeholder}</span>
    );

  return (
    <div className={classNames("datepicker-wrapper", className)}>
      {label && (
        <label className="datepicker-label" htmlFor="daterangepicker-input">
          {label}
        </label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <div className="datepicker-input-container">
            <button
              id="daterangepicker-input"
              type="button"
              className={classNames("datepicker-trigger", {
                "datepicker-trigger--error": !!error,
                "datepicker-trigger--disabled": disabled,
              })}
              disabled={disabled}
              aria-label={
                from && to ? `Selected range is ${formattedRange}` : placeholder
              }
            >
              <CalendarIcon className="datepicker-icon" />
              <span className="datepicker-value">{formattedRange}</span>
            </button>
            {from && onClear && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="datepicker-clear-button"
                aria-label="Clear selected date range"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="datepicker-popover-content" align="start">
          <DayPicker
            mode="range"
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            initialFocus
            disabled={disabled}
            {...props}
          />
        </PopoverContent>
      </Popover>
      {error && <p className="datepicker-error-message">{error}</p>}
    </div>
  );
};
