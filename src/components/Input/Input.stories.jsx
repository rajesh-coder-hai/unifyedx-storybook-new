import { yupResolver } from "@hookform/resolvers/yup";
import { AtSign, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../Button/Button";
import { Input } from "./Input";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "text" },
    type: {
      control: "select",
      options: ["text", "email", "password", "number"],
    },
    disabled: { control: "boolean" },
  },
};

// --- Standalone Stories ---

const StandaloneTemplate = (args) => (
  <div style={{ maxWidth: "400px" }}>
    <Input {...args} />
  </div>
);

export const Default = StandaloneTemplate.bind({});
Default.args = {
  label: "Full Name",
  id: "full-name",
  placeholder: "John Doe",
};

export const WithIcon = StandaloneTemplate.bind({});
WithIcon.args = {
  label: "Email Address",
  id: "email-icon",
  placeholder: "you@example.com",
  icon: AtSign,
};

export const ErrorState = StandaloneTemplate.bind({});
ErrorState.args = {
  label: "Password",
  id: "password-error",
  type: "password",
  icon: Lock,
  value: "123",
  error: "Password must be at least 8 characters long.",
};

// --- React Hook Form Integration Story ---

// 1. Define a validation schema with Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
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
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h2>Login Form (with RHF)</h2>
      <Input
        label="Email"
        id="email"
        type="email"
        placeholder="you@example.com"
        icon={AtSign}
        error={errors.email?.message} // ✅ Pass error message from RHF
        {...register("email")} // ✅ Spread the register function
      />
      <Input
        label="Password"
        id="password"
        type="password"
        placeholder="••••••••"
        icon={Lock}
        error={errors.password?.message}
        {...register("password")}
      />
      <div style={{ alignSelf: "flex-end" }}>
        <Button type="submit" label="Log In" />
      </div>
    </form>
  );
};

export const WithReactHookForm = RHFFormTemplate.bind({});
