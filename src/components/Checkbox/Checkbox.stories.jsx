import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../Button/Button";
import { Checkbox } from "./Checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

// --- Standalone Stories ---

const StandaloneTemplate = (args) => {
  // To make the checkbox interactive in Storybook, we manage its state here.
  const [isChecked, setIsChecked] = useState(args.checked || false);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    args.onChange(e.target.checked); // Fire the Storybook action
  };

  return (
    <div style={{ maxWidth: "400px" }}>
      <Checkbox {...args} checked={isChecked} onChange={handleChange} />
    </div>
  );
};

export const Default = StandaloneTemplate.bind({});
Default.args = {
  label: "I agree to the terms and conditions",
  id: "default-terms-checkbox", // ✅ Add a unique ID
};

export const PreChecked = StandaloneTemplate.bind({});
PreChecked.args = {
  label: "Receive marketing emails",
  checked: true,
  id: "pre-checked", // ✅ Add a unique ID
};

export const ErrorState = StandaloneTemplate.bind({});
ErrorState.args = {
  label: "You must agree to the terms",
  error: "This field is required",
  id: "error-checkbox", // ✅ Add a unique ID
};

export const WithoutLabel = StandaloneTemplate.bind({});
WithoutLabel.args = {
  // No label prop is passed
  id: "standalone-checkbox",
};

// --- React Hook Form Integration Story ---

const schema = yup.object().shape({
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions to continue."),
});

const RHFFormTemplate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { termsAccepted: false },
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
      <h2>Sign Up Form (with RHF)</h2>

      <Controller
        name="termsAccepted"
        control={control}
        render={({ field, fieldState }) => (
          <Checkbox
            label="I agree to the terms and conditions"
            error={fieldState.error?.message}
            // Pass the checked, onChange, and other props from RHF's Controller
            checked={field.value}
            {...field}
          />
        )}
      />

      <div style={{ alignSelf: "flex-end" }}>
        <Button type="submit" label="Sign Up" />
      </div>
    </form>
  );
};

export const WithReactHookForm = RHFFormTemplate.bind({});
