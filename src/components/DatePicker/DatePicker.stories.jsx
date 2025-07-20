import { yupResolver } from "@hookform/resolvers/yup";
import { addDays, subDays } from "date-fns";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../Button/Button";
import { DatePicker, DateRangePicker } from "./DatePicker";

export default {
  title: "Components/DatePicker",
  component: DatePicker,
  subcomponents: { DateRangePicker },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disables the date picker",
    },
    onClear: {
      action: "cleared",
      description: "Called when clear button is clicked",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no date is selected",
    },
    label: {
      control: "text",
      description: "Label for the date picker",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A customizable date picker component with single and range selection modes. Supports React Hook Form integration and validation.",
      },
    },
  },
};

// --- Single Date Picker Examples ---

const SingleTemplate = (args) => {
  const [date, setDate] = useState(args.value || null);
  return (
    <div style={{ maxWidth: "300px", margin: "2rem auto" }}>
      <DatePicker {...args} value={date} onChange={setDate} />
    </div>
  );
};

export const Default = SingleTemplate.bind({});
Default.args = {
  label: "Select a date",
  placeholder: "Choose your date",
};

export const WithInitialValue = SingleTemplate.bind({});
WithInitialValue.args = {
  label: "Appointment Date",
  value: new Date(),
};

export const WithClearButton = SingleTemplate.bind({});
WithClearButton.args = {
  label: "Birthday",
  value: new Date(),
  onClear: () => console.log("Date cleared"),
};

export const Disabled = SingleTemplate.bind({});
Disabled.args = {
  label: "Disabled Date Picker",
  value: new Date(),
  disabled: true,
};

export const WithError = SingleTemplate.bind({});
WithError.args = {
  label: "Due Date",
  error: "This field is required",
};

// --- Date Range Picker Examples ---

const RangeTemplate = (args) => {
  const [dateRange, setDateRange] = useState(
    args.value || {
      from: null,
      to: null,
    }
  );
  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <DateRangePicker {...args} value={dateRange} onChange={setDateRange} />
    </div>
  );
};

export const RangeDefault = RangeTemplate.bind({});
RangeDefault.args = {
  label: "Select date range",
  placeholder: "Choose start and end dates",
};

export const RangeWithInitialValues = RangeTemplate.bind({});
RangeWithInitialValues.args = {
  label: "Booking Period",
  value: {
    from: new Date(),
    to: addDays(new Date(), 7),
  },
};

export const RangeWithClearButton = RangeTemplate.bind({});
RangeWithClearButton.args = {
  label: "Vacation Dates",
  value: {
    from: subDays(new Date(), 3),
    to: addDays(new Date(), 4),
  },
  onClear: () => console.log("Range cleared"),
};

export const RangeDisabled = RangeTemplate.bind({});
RangeDisabled.args = {
  label: "Disabled Range Picker",
  value: {
    from: new Date(),
    to: addDays(new Date(), 2),
  },
  disabled: true,
};

export const RangeWithError = RangeTemplate.bind({});
RangeWithError.args = {
  label: "Project Timeline",
  error: "Invalid date range selected",
};

// --- React Hook Form Integration ---

const schema = yup.object().shape({
  eventDate: yup
    .date()
    .required("Event date is required")
    .min(new Date(), "Event date cannot be in the past"),
  vacation: yup
    .object({
      from: yup.date().required("Start date is required"),
      to: yup
        .date()
        .required("End date is required")
        .min(yup.ref("from"), "End date cannot be before start date"),
    })
    .required("Vacation dates are required"),
});

const RHFFormTemplate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      eventDate: null,
      vacation: { from: null, to: null },
    },
  });

  const onSubmit = (data) => {
    alert(`
      Form submitted successfully!
      
      Event Date: ${data.eventDate.toDateString()}
      Vacation: 
        From: ${data.vacation.from.toDateString()}
        To: ${data.vacation.to.toDateString()}
    `);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        padding: "1.5rem",
        border: "1px solid #e2e8f0",
        borderRadius: "0.5rem",
        backgroundColor: "white",
      }}
    >
      <h2 style={{ margin: "0 0 1rem", color: "#1e293b" }}>
        Event Planning Form
      </h2>

      <Controller
        name="eventDate"
        control={control}
        render={({ field, fieldState }) => (
          <DatePicker
            label="Event Date *"
            placeholder="Select event date"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="vacation"
        control={control}
        render={({ field, fieldState }) => (
          <DateRangePicker
            label="Vacation Dates *"
            placeholder="Select vacation period"
            error={
              fieldState.error?.message ||
              fieldState.error?.from?.message ||
              fieldState.error?.to?.message
            }
            {...field}
          />
        )}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <Button
          type="button"
          variant="secondary"
          onClick={handleReset}
          label="Reset"
        />
        <Button type="submit" variant="primary" label="Submit" />
      </div>
    </form>
  );
};

export const WithReactHookForm = RHFFormTemplate.bind({});
WithReactHookForm.parameters = {
  docs: {
    description: {
      story:
        "Demonstrates integration with React Hook Form including validation using Yup schema validation.",
    },
  },
};

// --- All Variations in One Story ---

export const Playground = (args) => {
  const [singleDate, setSingleDate] = useState(null);
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Single Date Picker</h3>
        <DatePicker {...args} value={singleDate} onChange={setSingleDate} />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem" }}>Date Range Picker</h3>
        <DateRangePicker {...args} value={dateRange} onChange={setDateRange} />
      </div>
    </div>
  );
};
Playground.args = {
  label: "Custom Label",
  placeholder: "Custom placeholder",
  disabled: false,
};
