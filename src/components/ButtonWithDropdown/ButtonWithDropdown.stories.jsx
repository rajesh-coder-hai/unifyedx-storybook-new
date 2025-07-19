import { Archive, ChevronDown, Edit, Icon, Trash2 } from "lucide-react";
import ButtonWithDropdown from "./ButtonWithDropdown";

// Define sample options for the dropdown menu
const sampleOptions = [
  {
    id: 1,
    label: "Edit",
    icon: <Edit size={16} />,
    onClick: () => alert("Editing!"),
  },
  {
    id: 2,
    label: "Archive",
    icon: <Archive size={16} />,
    onClick: () => alert("Archiving!"),
  },
  { id: 3, dividerBefore: true }, // This will render a divider
  {
    id: 4,
    label: "Delete",
    icon: <Trash2 size={16} />,
    onClick: () => alert("Deleting!"),
  },
];

export default {
  title: "Components/ButtonWithDropdown",
  component: ButtonWithDropdown,
  argTypes: {
    options: { control: "object" },
    disabled: { control: "boolean" },
    buttonProps: { control: "object" },
  },
};

const Template = (args) => (
  <div style={{ padding: "4rem 8rem", textAlign: "right" }}>
    <ButtonWithDropdown {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  options: sampleOptions,
  buttonProps: {
    label: "Actions",
    category: "primary",
    size: "medium",
    // icon: ChevronDown, // Optional icon for the button
  },
};

export const PrimaryButtonTrigger = Template.bind({});
PrimaryButtonTrigger.args = {
  options: sampleOptions,
  buttonProps: {
    label: "Publish Options",
    category: "primary",
    size: "large",
    style: { minWidth: "200px" }, // Example of passing style
  },
};
