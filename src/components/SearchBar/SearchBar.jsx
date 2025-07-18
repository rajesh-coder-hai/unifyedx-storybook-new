/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react"; // Importing the Search icon from react-feather
import debounce from "lodash/debounce";
import "./SearchBar.css"; // ✅ Import the stylesheet

const SearchBar = ({
  value = "",
  onDebouncedChange,
  debounceDelay = 400,
  placeholder = "Enter text...",
  label = "Search", // Added a default label for accessibility
  customClass = "",
  ...inputProps
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const debouncedHandler = useCallback(
    debounce((nextValue) => {
      onDebouncedChange?.(nextValue);
    }, debounceDelay),
    [debounceDelay, onDebouncedChange]
  );

  useEffect(() => {
    if (inputValue !== value) {
      debouncedHandler(inputValue);
    }
    return () => {
      debouncedHandler.cancel();
    };
  }, [inputValue, debouncedHandler, value]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={`search-bar-wrapper ${customClass}`}>
      {label && (
        <label htmlFor="search-field" className="sr-only">
          {label}
        </label>
      )}
      <div className="search-bar-icon-wrapper">
        <Search size={20} className="search-bar-icon" aria-hidden="true" />
      </div>
      <input
        id="search-field"
        className="search-bar-input"
        placeholder={placeholder}
        type="search"
        name="search"
        value={inputValue}
        onChange={handleChange}
        {...inputProps}
      />
    </div>
  );
};

export default SearchBar;
