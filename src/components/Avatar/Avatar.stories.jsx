import React from "react";
import { Avatar, AvatarGroup } from "./Avatar";

export default {
  title: "Components/Avatar",
  component: Avatar,
  subcomponents: { AvatarGroup },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large", "xlarge"],
    },
    src: { control: "text" },
    name: { control: "text" },
  },
};

export const Default = (args) => <Avatar {...args} />;
Default.args = {
  src: "https://i.pravatar.cc/150?u=a042581f4e29026024d", // A random avatar image
  name: "Jane Doe",
  size: "medium",
};
Default.storyName = "With Image";

export const WithInitials = (args) => <Avatar {...args} />;
WithInitials.args = {
  name: "John Smith",
  size: "medium",
  src: "", // No image source
};

export const PlaceholderIcon = (args) => <Avatar {...args} />;
PlaceholderIcon.args = {
  size: "medium",
  src: "",
  name: "", // No name provided
};

export const WithRandomColors = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    <Avatar size="large" name="Random Color" />
    <Avatar size="large" name="Another User" />
    <Avatar size="large" />
    <Avatar size="large" name="Peter Pan" />
  </div>
);
WithRandomColors.storyName = "With Random Colors";

export const WithCustomColors = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    <Avatar size="large" name="CC" bgColor="lightblue" textColor="darkblue" />
    <Avatar
      size="large"
      name="WP"
      bgColor="#f9a8d4" // Pink-300
      textColor="#831843" // Pink-800
    />
    <Avatar size="large" bgColor="teal" textColor="white" />
  </div>
);
WithCustomColors.storyName = "With Custom Colors";

export const Sizes = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    <Avatar
      size="small"
      name="XS"
      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
    />
    <Avatar
      size="medium"
      name="MD"
      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
    />
    <Avatar
      size="large"
      name="LG"
      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
    />
    <Avatar
      size="xlarge"
      name="XL"
      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
    />
  </div>
);

export const Grouped = () => (
  <AvatarGroup>
    <Avatar
      name="Jane Doe"
      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
    />
    <Avatar
      name="John Smith"
      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
    />
    <Avatar name="Peter Pan" />
    <Avatar
      name="Wendy Darling"
      src="https://i.pravatar.cc/150?u=a042581f4e29026702e"
    />
    <Avatar
      name="Tinker Bell"
      src="https://i.pravatar.cc/150?u=a042581f4e29026702d"
    />
    <Avatar name="Captain Hook" />
  </AvatarGroup>
);
Grouped.storyName = "Avatar Group";

export const GroupedWithMax = () => (
  <AvatarGroup max={3}>
    <Avatar
      name="Jane Doe"
      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
    />
    <Avatar
      name="John Smith"
      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
    />
    <Avatar name="Peter Pan" />
    <Avatar
      name="Wendy Darling"
      src="https://i.pravatar.cc/150?u=a042581f4e29026702e"
    />
    <Avatar
      name="Tinker Bell"
      src="https://i.pravatar.cc/150?u=a042581f4e29026702d"
    />
    <Avatar name="Captain Hook" />
  </AvatarGroup>
);
GroupedWithMax.storyName = "Avatar Group with Max Limit";
