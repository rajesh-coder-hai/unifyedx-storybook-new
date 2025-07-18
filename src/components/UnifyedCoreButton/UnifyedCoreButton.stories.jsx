import { UnifyedCoreButton as Button } from "./UnifyedCoreButton";
import { CheckCircle, PlusCircle } from "lucide-react";

export default {
  title: "Components/UnifyedCoreButton",
  component: Button,
  argTypes: {
    label: { control: "text" },
    category: { control: "radio", options: ["primary", "secondary"] },
    size: { control: "radio", options: ["small", "medium", "large"] },
    disabled: { control: "boolean" },
    loader: { control: "boolean" },
    onClick: { action: "clicked" },
    icon: { table: { disable: true } }, // Don't show icon control, we set it in stories
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Primary Button",
  category: "primary",
  size: "medium",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Secondary Button",
  category: "secondary",
  size: "medium",
};

export const Loading = Template.bind({});
Loading.args = {
  label: "Loading...", // Label is hidden by loader, but good for context
  category: "primary",
  loader: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Button",
  category: "primary",
  disabled: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  label: "Accept",
  category: "primary",
  icon: CheckCircle, // Pass the icon component directly
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  category: "secondary",
  size: "large",
  icon: PlusCircle,
  ariaLabel: "Add new item", // Crucial for accessibility
};

// Example showing all sizes
export const Sizes = (args) => (
  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    <Button {...args} size="small" label="Small" />
    <Button {...args} size="medium" label="Medium" />
    <Button {...args} size="large" label="Large" />
  </div>
);
Sizes.args = {
  category: "primary",
};
