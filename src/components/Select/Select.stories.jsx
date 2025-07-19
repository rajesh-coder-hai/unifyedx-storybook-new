import { yupResolver } from "@hookform/resolvers/yup";
import { Briefcase, Home, User } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../Button/Button";
import { Select } from "./Select";

// --- Mock Data ---
const options = [
  { id: 1, label: "Personal", icon: User },
  { id: 2, label: "Work", icon: Briefcase },
  { id: 3, label: "Home", icon: Home },
  { id: 4, label: "Archived", icon: null },
];

export default {
  title: "Components/Select",
  component: Select,
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
  },
};

// --- Standalone Stories ---
const StandaloneTemplate = (args) => {
  const [value, setValue] = useState(null);
  return (
    <div style={{ maxWidth: "400px" }}>
      <Select {...args} value={value} onChange={setValue} />
    </div>
  );
};

export const Default = StandaloneTemplate.bind({});
Default.args = {
  label: "Category",
  options: options,
};

export const Disabled = StandaloneTemplate.bind({});
Disabled.args = {
  label: "Category (Disabled)",
  options: options,
  disabled: true,
};

export const ErrorState = StandaloneTemplate.bind({});
ErrorState.args = {
  label: "Category",
  options: options,
  error: "This field is required.",
};

// --- React Hook Form Integration Story ---
const schema = yup.object().shape({
  category: yup
    .object()
    .shape({
      label: yup.string(),
      id: yup.number(),
    })
    .required("Please select a category."),
});

const RHFFormTemplate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { category: null },
  });

  const onSubmit = (data) => {
    alert("Form submitted successfully!\n" + JSON.stringify(data, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h2>Project Form (with RHF)</h2>

      {/* The Controller component is the bridge between RHF and our custom Select component */}
      <Controller
        name="category"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            label="Project Category"
            options={options}
            placeholder="Select a category..."
            error={fieldState.error?.message} // Pass error from RHF
            {...field} // Pass value, onChange, onBlur, and ref
          />
        )}
      />

      <div style={{ alignSelf: "flex-end" }}>
        <Button type="submit" label="Submit" />
      </div>
    </form>
  );
};

export const WithReactHookForm = RHFFormTemplate.bind({});
