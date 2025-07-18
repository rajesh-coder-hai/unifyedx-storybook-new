import { useState } from "react";
import SearchBar from "./SearchBar";

export default {
  title: "Components/SearchBar",
  component: SearchBar,
  argTypes: {
    onDebouncedChange: { action: "debouncedChange" },
    value: { control: "text" },
    placeholder: { control: "text" },
    debounceDelay: { control: "number" },
    label: { control: "text" },
  },
};

// Template to manage state for a controlled component
const Template = (args) => {
  const [searchValue, setSearchValue] = useState(args.value || "");

  const handleDebouncedChange = (value) => {
    setSearchValue(value);
    // This will also call the Storybook action
    args.onDebouncedChange(value);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem" }}>
      <SearchBar
        {...args}
        value={searchValue}
        onDebouncedChange={handleDebouncedChange}
      />
      <p style={{ marginTop: "1rem", fontFamily: "sans-serif", color: "#555" }}>
        Current debounced value: <strong>{searchValue}</strong>
      </p>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search for anything...",
  debounceDelay: 500,
  label: "Search",
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  ...Default.args,
  value: "Initial search term",
};

export const FastDebounce = Template.bind({});
FastDebounce.args = {
  ...Default.args,
  debounceDelay: 100,
  placeholder: "Debounces quickly (100ms)",
};
