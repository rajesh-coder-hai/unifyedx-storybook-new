import React from "react";
import { Button } from "../Button/Button";
import { FullScreenLoader, Spinner } from "./Spinner";

export default {
  title: "Components/Spinner",
  component: Spinner,
  subcomponents: { FullScreenLoader },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    color: {
      control: "select",
      options: ["primary", "white"],
    },
  },
};

// --- Inline Spinner Stories ---

export const Default = (args) => <Spinner {...args} />;
Default.args = {
  size: "medium",
  color: "primary",
};

export const Sizes = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
    <Spinner size="small" />
    <Spinner size="medium" />
    <Spinner size="large" />
  </div>
);

export const InsideAButton = () => (
  <Button label="Processing" category="primary" disabled={true}>
    <Spinner size="small" color="white" />
  </Button>
);
InsideAButton.storyName = "Component-Level (inside a Button)";

// --- Full Screen Loader Story ---

export const FullScreen = () => (
  <div>
    <p style={{ fontFamily: "sans-serif", marginBottom: "1rem" }}>
      This story demonstrates the full-screen app-level loader. It appears over
      all content.
    </p>
    <FullScreenLoader label="Fetching data..." />
  </div>
);
FullScreen.storyName = "App-Level (Full Screen)";
