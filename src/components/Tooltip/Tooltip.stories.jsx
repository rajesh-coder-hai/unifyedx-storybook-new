import React from "react";
import { Button } from "../Button/Button";
import { Info } from "lucide-react";
import { Tooltip } from "./Tooltip";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
  argTypes: {
    content: { control: "text" },
    variant: {
      control: "select",
      options: ["dark", "light", "info", "success", "error"],
    },
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    place: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
  },
  parameters: {
    layout: "centered",
  },
};

const Template = (args) => (
  <div style={{ padding: "4rem" }}>
    <Tooltip {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  content: "This is a tooltip!",
  children: <Button label="Hover me" />,
};

export const Variants = () => (
  <div style={{ display: "flex", gap: "2rem" }}>
    <Tooltip content="Light theme" variant="light">
      <Button label="Light" />
    </Tooltip>
    <Tooltip content="Info theme" variant="info">
      <Button label="Info" />
    </Tooltip>
    <Tooltip content="Success theme" variant="success">
      <Button label="Success" />
    </Tooltip>
    <Tooltip content="Error theme" variant="error">
      <Button label="Error" />
    </Tooltip>
  </div>
);

export const Placements = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "2rem",
      placeItems: "center",
    }}
  >
    <div />
    <Tooltip content="Placement: Top" place="top">
      <Button label="Top" />
    </Tooltip>
    <div />

    <Tooltip content="Placement: Left" place="left">
      <Button label="Left" />
    </Tooltip>
    <div></div>
    <Tooltip content="Placement: Right" place="right">
      <Button label="Right" />
    </Tooltip>

    <div />
    <Tooltip content="Placement: Bottom" place="bottom">
      <Button label="Bottom" />
    </Tooltip>
    <div />
  </div>
);

export const WithExternalStyles = Template.bind({});
WithExternalStyles.args = {
  content: "This tooltip has custom styles applied.",
  children: <Button label="Custom Styled" />,
  // You can pass an external class to override styles
  className: "my-custom-tooltip",
};
// You would add .my-custom-tooltip { ... } to a global CSS file
// For example: .my-custom-tooltip { font-family: "Georgia", serif; --rt-bg-color: #6d28d9; }
