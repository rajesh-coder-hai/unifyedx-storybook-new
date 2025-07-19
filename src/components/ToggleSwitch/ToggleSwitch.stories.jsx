import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../Button/Button";
import { ToggleSwitch } from "./ToggleSwitch";

export default {
  title: "Components/ToggleSwitch",
  component: ToggleSwitch,
  argTypes: {
    label: { control: "text" },
    labelPosition: { control: "radio", options: ["left", "right"] },
    error: { control: "text" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

// --- Standalone Stories ---
const StandaloneTemplate = (args) => {
  const [isEnabled, setIsEnabled] = useState(args.checked || false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "300px",
      }}
    >
      <ToggleSwitch {...args} checked={isEnabled} onChange={setIsEnabled} />
    </div>
  );
};

export const Default = StandaloneTemplate.bind({});
Default.args = {
  label: "Enable Notifications",
  checked: true,
};

export const LabelOnLeft = StandaloneTemplate.bind({});
LabelOnLeft.args = {
  label: "Dark Mode",
  labelPosition: "left",
  checked: false,
};

export const ErrorState = StandaloneTemplate.bind({});
ErrorState.args = {
  label: "Save Changes",
  checked: false,
  error: "Setting could not be saved.",
};

// --- React Hook Form Integration Story ---
const schema = yup.object().shape({
  autoSave: yup.boolean(),
  darkMode: yup.boolean(),
});

const RHFFormTemplate = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { autoSave: true, darkMode: false },
  });

  const onSubmit = (data) => {
    alert("Settings saved!\n" + JSON.stringify(data, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <h2>User Settings (with RHF)</h2>

      <Controller
        name="autoSave"
        control={control}
        render={({ field }) => (
          <ToggleSwitch
            label="Enable Auto-Save"
            labelPosition="right"
            checked={field.value}
            onChange={field.onChange}
            {...field}
          />
        )}
      />

      <Controller
        name="darkMode"
        control={control}
        render={({ field }) => (
          <ToggleSwitch
            label="Dark Mode"
            labelPosition="left"
            checked={field.value}
            onChange={field.onChange}
            {...field}
          />
        )}
      />

      <div style={{ alignSelf: "flex-end", marginTop: "1rem" }}>
        <Button type="submit" label="Save Settings" />
      </div>
    </form>
  );
};

export const WithReactHookForm = RHFFormTemplate.bind({});
