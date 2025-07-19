import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../Button/Button";
import { Textarea } from "./Textarea";

export default {
  title: "Components/Textarea",
  component: Textarea,
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    rows: { control: "number" },
    maxLength: { control: "number" },
    showCharCount: { control: "boolean" },
  },
};

// --- Standalone Stories ---

const StandaloneTemplate = (args) => (
  <div style={{ maxWidth: "500px" }}>
    <Textarea {...args} />
  </div>
);

export const WithCharacterCount = StandaloneTemplate.bind({});
WithCharacterCount.args = {
  label: "Tweet",
  id: "tweet",
  placeholder: "What's happening?",
  rows: 5,
  maxLength: 280,
  showCharCount: true, // Turn the feature on
  defaultValue: "Hello, Storybook and React 19!",
};

export const Default = StandaloneTemplate.bind({});
Default.args = {
  label: "Your Message",
  id: "message",
  placeholder: "Enter your message here...",
  rows: 5,
};

export const ErrorState = StandaloneTemplate.bind({});
ErrorState.args = {
  label: "Feedback",
  id: "feedback",
  value: "This is not long enough.",
  error: "Feedback must be at least 50 characters.",
  rows: 5,
};

// --- React Hook Form Integration Story ---

// 1. Define a validation schema with Yup
const schema = yup.object().shape({
  comment: yup
    .string()
    .min(10, "Your comment must be at least 10 characters long.")
    .required("A comment is required."),
});

// 2. Create a template component that is a full form
const RHFFormTemplate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert("Form submitted successfully!\n" + JSON.stringify(data, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h2>Leave a Comment (with RHF)</h2>
      <Textarea
        label="Comment"
        id="comment"
        placeholder="Tell us what you think..."
        rows={6}
        error={errors.comment?.message} // ✅ Pass error message from RHF
        {...register("comment")} // ✅ Spread the register function
      />
      <div style={{ alignSelf: "flex-end" }}>
        <Button type="submit" label="Post Comment" />
      </div>
    </form>
  );
};

export const WithReactHookForm = RHFFormTemplate.bind({});
