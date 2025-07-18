/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  RadioGroup,
  Tab,
  TabGroup,
  TabList,
  TabPanels,
  Transition,
  TransitionChild,
} from "@headlessui/react";
// import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DateRangePicker } from "react-date-range";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import moment from "moment";
import { Fragment, useMemo, useState } from "react";
// import { dateRangeOptions } from "../../utils/constant";
import "./GenericFilter.css"; // Import the CSS file
import "./overrideDateRange.css"; // Import the custom styles for date range picker

// The user fetching function is now a prop for better testing and Storybook integration
const GenericFilterModal = ({
  isOpen,
  onClose,
  onApplyFilters,
  resetFilters,
  filterConfig = [],
  initialFormikValues,
  fetchCreatedOrUpdatedByUsers = async () => [], // Mockable fetcher
}) => {
  const [userLists, setUserLists] = useState({
    createdBy: [],
    updatedBy: [],
  });
  const [loadingUsers, setLoadingUsers] = useState({
    createdBy: false,
    updatedBy: false,
  });

  const formik = useFormik({
    initialValues: JSON.parse(JSON.stringify(initialFormikValues)), // Deep copy
    onSubmit: (values) => {
      const payload = {};
      Object.keys(values).forEach((key) => {
        payload[key] = {
          operator: values[key].operator || "in",
          values: Array.isArray(values[key].values) ? values[key].values : [],
          range: values[key].range || null,
        };
      });
      console.log("[storybook filter] Applied Filters:", payload);

      if (typeof onApplyFilters === "function") {
        onApplyFilters({
          filters: payload,
          activeCount: activeFilterCount,
        });
      }
      onClose();
    },
    enableReinitialize: true,
  });

  const activeFilters = useMemo(() => {
    return filterConfig.reduce((acc, filter) => {
      const filterKey = filter.key;
      const filterValue = formik.values[filterKey];
      let isActive = false;
      if (filterValue) {
        switch (filter.type) {
          case "multiselect":
          case "multiselect-users":
            isActive =
              Array.isArray(filterValue.values) &&
              filterValue.values.length > 0;
            break;
          case "date":
            isActive = filterValue.range && filterValue.range !== "";
            break;
        }
      }
      acc[filterKey] = isActive;
      return acc;
    }, {});
  }, [filterConfig, formik.values]);

  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

  const fetchUsers = async (field, url) => {
    try {
      setLoadingUsers((prev) => ({ ...prev, [field]: true }));
      const users = await fetchCreatedOrUpdatedByUsers(field, url);
      setUserLists((prev) => ({ ...prev, [field]: users }));
    } catch (error) {
      console.error(`Error fetching ${field} users:`, error);
    } finally {
      setLoadingUsers((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleTabChange = (index) => {
    const tabKey = filterConfig[index].key;
    const url = filterConfig[index].url;
    if (
      filterConfig[index].type === "multiselect-users" &&
      userLists[tabKey].length === 0 &&
      !loadingUsers[tabKey]
    ) {
      fetchUsers(tabKey, url);
    }
  };

  const handleDateRangeTypeChange = (field, selectedRangeType) => {
    let dateValues = [];
    const today = moment();

    switch (selectedRangeType) {
      case "today":
        dateValues = [
          today.clone().startOf("day").toDate(),
          today.clone().endOf("day").toDate(),
        ];
        break;
      case "this_week":
        dateValues = [
          today.clone().startOf("isoWeek").toDate(),
          today.clone().endOf("day").toDate(),
        ];
        break;
      case "last_week":
        dateValues = [
          today.clone().subtract(1, "week").startOf("isoWeek").toDate(),
          today.clone().subtract(1, "week").endOf("isoWeek").toDate(),
        ];
        break;
      case "this_month":
        dateValues = [
          today.clone().startOf("month").toDate(),
          today.clone().endOf("month").toDate(),
        ];
        break;
      case "last_month":
        dateValues = [
          today.clone().subtract(1, "month").startOf("month").toDate(),
          today.clone().subtract(1, "month").endOf("month").toDate(),
        ];
        break;
      case "custom":
        dateValues = formik.values[field]?.values || [];
        break;
      default:
        dateValues = [];
    }

    formik.setFieldValue(field, {
      ...formik.values[field],
      values: dateValues,
      range: selectedRangeType,
    });
  };

  const handleCustomDateChange = (field, event) => {
    const values = event.value || [];
    if (values[0] && values[1]) {
      formik.setFieldValue(`${field}.values`, [values[0], values[1]]);
    } else {
      formik.setFieldValue(`${field}.values`, []);
    }
  };

  const handleClearAllFilters = () => {
    formik.resetForm();
    setUserLists({ createdBy: [], updatedBy: [] });
    resetFilters();
  };

  const renderFilterContent = (filterKey) => {
    const filter = filterConfig.find((f) => f.key === filterKey);
    if (!filter) return null;

    const fieldValue =
      formik.values[filterKey] || initialFormikValues[filterKey];
    const currentValues = Array.isArray(fieldValue.values)
      ? fieldValue.values
      : [];

    switch (filter.type) {
      case "multiselect":
        return (
          <div className="filter-panel-content">
            <div className="filter-operator-group">
              <label className="filter-label">Operator:</label>
              <select
                value={fieldValue.operator || "in"}
                onChange={(e) =>
                  formik.setFieldValue(`${filterKey}.operator`, e.target.value)
                }
                className="filter-select"
              >
                {filter.operators.map((op) => (
                  <option key={op} value={op}>
                    {op === "in" ? "Includes" : "Excludes"}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-checkbox-list">
              <div className="filter-checkbox-item">
                <input
                  type="checkbox"
                  id={`select-all-${filterKey}`}
                  className="filter-checkbox-input"
                  checked={
                    filter.options.length > 0 &&
                    currentValues.length === filter.options.length
                  }
                  onChange={(e) => {
                    const allValues = e.target.checked
                      ? filter.options.map((opt) => opt.value)
                      : [];
                    formik.setFieldValue(`${filterKey}.values`, allValues);
                  }}
                />
                <label
                  htmlFor={`select-all-${filterKey}`}
                  className="filter-checkbox-label"
                >
                  Select All
                </label>
              </div>
              {filter.options.map((option) => (
                <div key={option.value} className="filter-checkbox-item">
                  <input
                    type="checkbox"
                    id={`${filterKey}-${option.value}`}
                    className="filter-checkbox-input"
                    checked={currentValues.includes(option.value)}
                    onChange={(e) => {
                      const newValues = e.target.checked
                        ? [...currentValues, option.value]
                        : currentValues.filter((v) => v !== option.value);
                      formik.setFieldValue(`${filterKey}.values`, newValues);
                    }}
                  />
                  <label
                    htmlFor={`${filterKey}-${option.value}`}
                    className="filter-checkbox-label"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case "multiselect-users":
        const users = userLists[filterKey] || [];
        const isLoading = loadingUsers[filterKey];
        return (
          <div className="filter-panel-content">
            <div className="filter-operator-group">
              <label className="filter-label">Operator:</label>
              <select
                value={fieldValue.operator || "in"}
                onChange={(e) =>
                  formik.setFieldValue(`${filterKey}.operator`, e.target.value)
                }
                className="filter-select"
              >
                {filter.operators.map((op) => (
                  <option key={op} value={op}>
                    {op === "in" ? "Includes" : "Excludes"}
                  </option>
                ))}
              </select>
            </div>
            {isLoading ? (
              <div className="loading-spinner">
                <div></div>
              </div>
            ) : (
              <div className="filter-checkbox-list">
                {users.length > 0 ? (
                  <>
                    <div className="filter-checkbox-item">
                      <input
                        type="checkbox"
                        id={`select-all-users-${filterKey}`}
                        className="filter-checkbox-input"
                        checked={
                          users.length > 0 &&
                          currentValues.length === users.length
                        }
                        onChange={(e) => {
                          const allUserEmails = e.target.checked
                            ? users.map((user) => user.email)
                            : [];
                          formik.setFieldValue(
                            `${filterKey}.values`,
                            allUserEmails
                          );
                        }}
                      />
                      <label
                        htmlFor={`select-all-users-${filterKey}`}
                        className="filter-checkbox-label"
                      >
                        Select All Users
                      </label>
                    </div>
                    {users.map((user) => (
                      <div key={user.email} className="filter-checkbox-item">
                        <input
                          type="checkbox"
                          id={`${filterKey}-${user.email}`}
                          className="filter-checkbox-input"
                          checked={currentValues.includes(user.email)}
                          onChange={(e) => {
                            const newValues = e.target.checked
                              ? [...currentValues, user.email]
                              : currentValues.filter((v) => v !== user.email);
                            formik.setFieldValue(
                              `${filterKey}.values`,
                              newValues
                            );
                          }}
                        />
                        <label
                          htmlFor={`${filterKey}-${user.email}`}
                          className="filter-checkbox-label"
                        >
                          <span className="user-label-name">{user.name}</span>
                          <span className="user-label-email">{user.email}</span>
                        </label>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    No users loaded.
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "date":
        // The current date range from Formik state.
        const dateValues = fieldValue.values || [];
        const [startDate, endDate] = dateValues;
        const hasDateSelection = startDate && endDate;
        // react-date-range uses a specific object structure for its state.
        const selectionRange = {
          startDate: startDate instanceof Date ? startDate : new Date(), // Fallback to today
          endDate: endDate instanceof Date ? endDate : new Date(), // Fallback to today
          key: "selection",
        };

        return (
          <div className="filter-panel-content">
            <div className="filter-operator-group">
              <label className="filter-label">Operator:</label>
              <select
                value={fieldValue.operator}
                onChange={(e) =>
                  formik.setFieldValue(`${filterKey}.operator`, e.target.value)
                }
                className="filter-select"
              >
                {filter.operators.map((op) => (
                  <option key={op} value={op}>
                    {op === "in" ? "Is" : "Is not"}
                  </option>
                ))}
              </select>

              {hasDateSelection && (
                <button
                  type="button"
                  onClick={() => {
                    // Reset this specific field to its initial state
                    formik.setFieldValue(
                      filterKey,
                      initialFormikValues[filterKey]
                    );
                  }}
                  className="filter-clear-selection-button"
                >
                  Clear selection
                </button>
              )}
            </div>

            <DateRangePicker
              ranges={[selectionRange]}
              onChange={(item) => {
                // When the date changes, update Formik's state directly.
                const { startDate, endDate } = item.selection;
                formik.setFieldValue(`${filterKey}.values`, [
                  startDate,
                  endDate,
                ]);
              }}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              direction="horizontal"
              inputRanges={[]}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="filter-modal-overlay" aria-hidden="true" />
        </TransitionChild>
        <div className="filter-modal-container">
          <div className="filter-modal-positioner">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-full"
            >
              <DialogPanel className="filter-modal-panel">
                <div className="filter-header">
                  <DialogTitle as="h3" className="filter-title">
                    Filters
                  </DialogTitle>
                  <button
                    type="button"
                    onClick={handleClearAllFilters}
                    className="filter-clear-button"
                  >
                    Clear All Filters
                  </button>
                </div>
                <form onSubmit={formik.handleSubmit} className="filter-form">
                  <div className="filter-content-wrapper">
                    <TabGroup
                      vertical
                      onChange={handleTabChange}
                      //   className="flex flex-grow"
                      style={{
                        display: "flex",
                        flexGrow: 1,
                      }}
                    >
                      <TabList className="filter-tabs-list">
                        {filterConfig.map((filter) => (
                          <Tab key={filter.key} className="filter-tab-item">
                            {filter.label}
                            {activeFilters[filter.key] && (
                              <span
                                className="filter-active-indicator"
                                title="Filter active"
                              ></span>
                            )}
                          </Tab>
                        ))}
                      </TabList>
                      <TabPanels className="filter-tabs-panels">
                        {filterConfig.map((filter) => (
                          <Tab.Panel
                            key={filter.key}
                            className="filter-tab-panel"
                          >
                            <motion.div
                              key={filter.key}
                              initial={{ opacity: 0.8, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3 }}
                              className="h-full"
                            >
                              {renderFilterContent(filter.key)}
                            </motion.div>
                          </Tab.Panel>
                        ))}
                      </TabPanels>
                    </TabGroup>
                  </div>
                  <div className="filter-footer">
                    <button
                      type="button"
                      onClick={onClose}
                      className="filter-button cancel"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!formik.dirty}
                      className="filter-button apply"
                    >
                      Apply Filters{" "}
                      {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default GenericFilterModal;
