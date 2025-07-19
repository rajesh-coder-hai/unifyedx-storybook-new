import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../Button/Button";
import { RadioGroup } from "./RadioGroup";

// --- Mock Data ---
const notificationOptions = [
  {
    value: "all",
    label: "All Notifications",
    description: "Receive all updates about your account.",
  },
  {
    value: "mentions",
    label: "Only @mentions",
    description: "Only get notified when someone mentions you.",
  },
  {
    value: "none",
    label: "No Notifications",
    description: "You will not receive any notifications.",
  },
];

export default {
  title: "Components/RadioGroup",
  component: RadioGroup,
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
  },
};

// --- Standalone Stories ---
const StandaloneTemplate = (args) => {
  const [value, setValue] = useState(notificationOptions[1].value); // Default to 'mentions'
  return (
    <div style={{ maxWidth: "400px" }}>
      <RadioGroup {...args} value={value} onChange={setValue} />
    </div>
  );
};

export const Default = StandaloneTemplate.bind({});
Default.args = {
  label: "Email Notifications",
  options: notificationOptions,
};

export const ErrorState = StandaloneTemplate.bind({});
ErrorState.args = {
  label: "Email Notifications",
  options: notificationOptions,
  error: "This selection is required.",
};

// --- React Hook Form Integration Story ---
const schema = yup.object().shape({
  notificationType: yup
    .string()
    .required("You must select a notification preference."),
});

// ... (all existing imports, mock data, and stories)

// ✅ NEW: Add a template for the native radio group form
const NativeRHFFormTemplate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { notificationType: "" },
  });

  const onSubmit = (data) => {
    alert("Native form submitted!\n" + JSON.stringify(data, null, 2));
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
      <h2>Native Radio Group (with RHF)</h2>

      {/* Container for the native radio inputs */}
      <div className="native-radiogroup-container">
        {notificationOptions.map((option) => (
          <div key={option.value} className="native-radio-option">
            <input
              type="radio"
              id={`native-${option.value}`} // Unique ID for the label
              value={option.value}
              // RHF's register function handles value, onChange, etc. for native inputs
              {...register("notificationType")}
            />
            <label htmlFor={`native-${option.value}`}>
              <span className="native-radio-label">{option.label}</span>
              <span className="native-radio-description">
                {option.description}
              </span>
            </label>
          </div>
        ))}
      </div>

      {/* Display error message */}
      {errors.notificationType && (
        <p className="radiogroup-error-message">
          {errors.notificationType.message}
        </p>
      )}

      <div style={{ alignSelf: "flex-end" }}>
        <Button type="submit" label="Save Preferences" />
      </div>
    </form>
  );
};

// ✅ NEW: Export the new story
export const NativeWithReactHookForm = NativeRHFFormTemplate.bind({});

const RHFFormTemplate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { notificationType: "" },
  });

  const onSubmit = (data) => {
    alert("Preferences saved!\n" + JSON.stringify(data, null, 2));
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
      <h2>Notification Settings (with RHF)</h2>

      <Controller
        name="notificationType"
        control={control}
        render={({ field, fieldState }) => (
          <RadioGroup
            label="How do you want to be notified?"
            options={notificationOptions}
            error={fieldState.error?.message}
            {...field} // Spreads value, onChange, onBlur, and ref
          />
        )}
      />

      <div style={{ alignSelf: "flex-end" }}>
        <Button type="submit" label="Save Preferences" />
      </div>
    </form>
  );
};

export const WithReactHookForm = RHFFormTemplate.bind({});
