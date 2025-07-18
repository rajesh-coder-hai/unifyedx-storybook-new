// src/components/GenericFilter/GenericFilter.stories.js
import { useState } from "react";
import GenericFilterModal from "./GenericFilter";

// --- Mock Data and Configuration ---

const initialFormikValues = {
  status: { operator: "in", values: [] },
  createdBy: { operator: "in", values: [] },
  createdAt: { operator: "between", values: [], range: "this_week" },
};

const filterConfig = [
  {
    key: "status",
    label: "Status",
    type: "multiselect",
    operators: ["in", "not_in"],
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "pending", label: "Pending Review" },
      { value: "archived", label: "Archived" },
    ],
  },
  {
    key: "createdBy",
    label: "Created By",
    type: "multiselect-users",
    operators: ["in", "not_in"],
    url: "/api/users/creators", // Example URL
  },
  {
    key: "createdAt",
    label: "Creation Date",
    type: "date",
    operators: ["between", "not_between"],
  },
];

// A mock function to simulate fetching users from an API
const mockUserFetcher = async (field, url) => {
  console.log(`Mock fetch for "${field}" from URL: ${url}`);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { _id: "user1", name: "Alice Johnson", email: "alice@example.com" },
    { _id: "user2", name: "Bob Williams", email: "bob@example.com" },
    { _id: "user3", name: "Charlie Brown", email: "charlie@example.com" },
    { _id: "user4", name: "Diana Evans", email: "diana@example.com" },
    { _id: "user5", name: "Ethan Clark", email: "ethan@example.com" },
    { _id: "user6", name: "Fiona Davis", email: "fiona@example.com" },
    { _id: "user7", name: "George Harris", email: "george@example.com" },
    { _id: "user8", name: "Hannah Lewis", email: "hannah@example.com" },
    { _id: "user9", name: "Ian Walker", email: "ian@example.com" },
    { _id: "user10", name: "Jasmine Young", email: "jasmine@example.com" },
    { _id: "user11", name: "Kevin Scott", email: "kevin@example.com" },
    { _id: "user12", name: "Lily Allen", email: "lily@example.com" },
    { _id: "user13", name: "Michael Turner", email: "michael@example.com" },
    { _id: "user14", name: "Nora King", email: "nora@example.com" },
    { _id: "user15", name: "Oliver Wright", email: "oliver@example.com" },
    { _id: "user16", name: "Penelope Adams", email: "penelope@example.com" },
    { _id: "user17", name: "Quentin Price", email: "quentin@example.com" },
    { _id: "user18", name: "Rachel Mitchell", email: "rachel@example.com" },
    { _id: "user19", name: "Samuel Morgan", email: "samuel@example.com" },
    { _id: "user20", name: "Tina Ross", email: "tina@example.com" },
    { _id: "user21", name: "Umar Brooks", email: "umar@example.com" },
    { _id: "user22", name: "Violet Perez", email: "violet@example.com" },
    { _id: "user23", name: "William Diaz", email: "william@example.com" },
    { _id: "user24", name: "Xena Gray", email: "xena@example.com" },
    { _id: "user25", name: "Yusuf Powell", email: "yusuf@example.com" },
    { _id: "user26", name: "Zara Rivera", email: "zara@example.com" },
    { _id: "user27", name: "Arjun Mehta", email: "arjun@example.com" },
    { _id: "user28", name: "Bhavna Reddy", email: "bhavna@example.com" },
    { _id: "user29", name: "Carlos Jimenez", email: "carlos@example.com" },
    { _id: "user30", name: "Divya Nair", email: "divya@example.com" },
  ];
};

export default {
  title: "Components/GenericFilter",
  component: GenericFilterModal,
  // Define argTypes to get interactive controls and actions in Storybook UI
  argTypes: {
    isOpen: { control: "boolean" },
    onClose: { action: "onClose" },
    onApplyFilters: { action: "onApplyFilters" },
    resetFilters: { action: "resetFilters" },
    filterConfig: { control: "object" },
    initialFormikValues: { control: "object" },
  },
};

// --- Story Template ---

const Template = (args) => {
  // Use state to manage the open/closed state from Storybook controls
  const [isOpen, setIsOpen] = useState(args.isOpen);

  // A more realistic reset function for the story
  const handleReset = () => {
    // In a real app, you'd reset your state management here
    console.log("Filters Reset!");
    // For the story, we can just log it, or you could reset formik values if needed
    args.resetFilters();
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="filter-button apply">
        Open Filter
      </button>
      <GenericFilterModal
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          args.onClose(); // Also trigger the storybook action
        }}
        resetFilters={handleReset}
      />
    </div>
  );
};

// --- Stories ---

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  filterConfig: filterConfig,
  initialFormikValues: initialFormikValues,
  fetchCreatedOrUpdatedByUsers: mockUserFetcher, // Pass the mock fetcher
};

export const ClosedByDefault = Template.bind({});
ClosedByDefault.args = {
  ...Default.args,
  isOpen: false,
};
