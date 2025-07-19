/* eslint-disable react/prop-types */
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import classNames from "classnames";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import React, { useState } from "react";
import "./Select.css";

export const Select = ({
  label,
  value, // From RHF's <Controller>
  onChange, // From RHF's <Controller>
  options = [],
  placeholder = "Select an option...",
  disabled = false,
  error,
  ref, // From RHF's <Controller>
}) => {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  const selectedOption = options.find((option) => option.id === value?.id);

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className="select-wrapper" ref={ref}>
        {label && <label className="select-label">{label}</label>}
        <div className="select-button-container">
          <ListboxButton
            className={classNames("select-button", {
              "select-button--error": !!error,
            })}
          >
            <span className="select-value-display">
              {selectedOption ? (
                selectedOption.label
              ) : (
                <span className="placeholder">{placeholder}</span>
              )}
            </span>
            <ChevronsUpDown className="select-chevron" aria-hidden="true" />
          </ListboxButton>
          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="select-options">
              <div className="search-input-wrapper">
                <Search className="search-icon" aria-hidden="true" />
                <input
                  type="text"
                  className="select-search-input"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="select-options-list">
                {filteredOptions.length === 0 && query !== "" ? (
                  <div className="no-results">No results found.</div>
                ) : (
                  filteredOptions.map((option) => (
                    <ListboxOption
                      key={option.id}
                      className={({ active }) =>
                        `select-option ${active ? "active" : ""}`
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <div className="option-content">
                            {option.icon && (
                              <option.icon className="option-icon" />
                            )}
                            <span
                              className={`option-label ${
                                selected ? "selected" : ""
                              }`}
                            >
                              {option.label}
                            </span>
                          </div>
                          {selected ? (
                            <Check
                              className="option-check-icon"
                              aria-hidden="true"
                            />
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))
                )}
              </div>
            </ListboxOptions>
          </Transition>
        </div>
        {error && <p className="select-error-message">{error}</p>}
      </div>
    </Listbox>
  );
};
