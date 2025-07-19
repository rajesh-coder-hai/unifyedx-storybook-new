import { Home, Settings, User } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  argTypes: {
    crumbs: { control: "object" },
  },
  parameters: {
    layout: "centered", // Center the component in the story canvas
  },
};

const Template = (args) => <Breadcrumbs {...args} />;

// --- Mock Data ---
const threeLevels = [
  { label: "Home", href: "#", icon: Home },
  { label: "Settings", href: "#", icon: Settings },
  { label: "Account", href: "#", icon: User },
];

const twoLevels = [
  { label: "Projects", href: "#" },
  { label: "My Awesome Project", href: "#" },
];

// --- Stories ---
export const Default = Template.bind({});
Default.args = {
  crumbs: threeLevels,
};
Default.storyName = "Three Levels with Icons";

export const ShortPath = Template.bind({});
ShortPath.args = {
  crumbs: twoLevels,
};
ShortPath.storyName = "Two Levels";

export const SingleLevel = Template.bind({});
SingleLevel.args = {
  crumbs: [{ label: "Dashboard", href: "#", icon: Home }],
};
SingleLevel.storyName = "Single Level (Home)";
