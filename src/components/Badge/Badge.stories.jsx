import React, { useState } from "react";
import { Circle, AlertTriangle, Tag } from "lucide-react";
import { Badge } from "./Badge";

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: ["default", "primary", "success", "warning", "danger"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    onRemove: { action: "removed" },
    bgColor: { control: "color" },
    textColor: { control: "color" },
  },
};

const Template = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Default Badge",
  variant: "default",
};

// --- Stories for each variant ---
export const Variants = () => (
  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
    <Badge label="Default" variant="default" />
    <Badge label="Primary" variant="primary" />
    <Badge label="Success" variant="success" />
    <Badge label="Warning" variant="warning" />
    <Badge label="Danger" variant="danger" />
  </div>
);

// --- Stories for sizes ---
export const Sizes = () => (
  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
    <Badge label="Small" size="small" variant="primary" />
    <Badge label="Medium" size="medium" variant="primary" />
    <Badge label="Large" size="large" variant="primary" />
  </div>
);

// --- Stories for complex variations ---
export const WithIcon = Template.bind({});
WithIcon.args = {
  label: "In Progress",
  variant: "success",
  icon: Circle,
};

export const WithRemoveButton = Template.bind({});
WithRemoveButton.args = {
  label: "Filter Applied",
  variant: "primary",
  onRemove: () => alert("Remove clicked!"),
};

export const WithIconAndRemove = Template.bind({});
WithIconAndRemove.args = {
  label: "High Priority",
  variant: "danger",
  icon: AlertTriangle,
  onRemove: () => alert("Remove clicked!"),
};
WithIconAndRemove.storyName = "With Icon and Remove Button";

// --- Story for custom colors ---
export const WithCustomColors = Template.bind({});
WithCustomColors.args = {
  label: "Custom",
  bgColor: "#6d28d9", // violet-800
  textColor: "#ede9fe", // violet-100
};

// ✅ NEW: Story to demonstrate the remove functionality interactively
const InteractiveRemoveTemplate = () => {
  // 1. Manage a list of badges in the story's state
  const [tags, setTags] = useState([
    { id: 1, label: "React", variant: "primary" },
    { id: 2, label: "Storybook", variant: "warning" },
    { id: 3, label: "CSS", variant: "success" },
    { id: 4, label: "JavaScript", variant: "default" },
  ]);

  // 2. Create a handler that removes a badge by its ID
  const handleRemove = (idToRemove) => {
    setTags((currentTags) =>
      currentTags.filter((tag) => tag.id !== idToRemove)
    );
    // In a real app, you might also call a function passed via args
    // args.onRemove(idToRemove);
  };

  return (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      {tags.map((tag) => (
        <Badge
          key={tag.id}
          label={tag.label}
          variant={tag.variant}
          icon={Tag}
          // 3. Pass the handler to the onRemove prop
          onRemove={() => handleRemove(tag.id)}
        />
      ))}
    </div>
  );
};

export const InteractiveRemove = InteractiveRemoveTemplate.bind({});
InteractiveRemove.storyName = "With Interactive Remove";
