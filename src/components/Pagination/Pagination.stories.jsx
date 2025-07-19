import React, { useState, useEffect } from "react";
import { Pagination } from "./Pagination";

export default {
  title: "Components/Pagination",
  component: Pagination,
  argTypes: {
    totalItems: {
      control: "number",
      description: "The total number of items to be paginated.",
    },
    itemsPerPageOptions: {
      control: "object",
      description:
        'An array of numbers for the "Rows per page" select options.',
    },
    initialPage: {
      control: "number",
      description: "The initial page to display for the story.",
    },
    onPageChange: {
      action: "pageChanged",
      description: "Callback function when the page number changes.",
    },
    onItemsPerPageChange: {
      action: "itemsPerPageChanged",
      description: "Callback function when the items per page value changes.",
    },
  },
  parameters: {
    layout: "centered",
  },
};

// This template component holds the state, making the Pagination component interactive in Storybook.
const Template = ({
  totalItems,
  itemsPerPageOptions,
  initialPage = 1,
  ...args
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(
    itemsPerPageOptions[0] || 10
  );

  // Resets the current page if the totalItems prop changes in Storybook controls
  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems]);

  const handlePageChange = (newPage) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // This calls the Storybook action, so you can see the event in the "Actions" tab
      args.onPageChange(newPage);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Always reset to the first page
    args.onItemsPerPageChange(newItemsPerPage);
  };

  return (
    <div style={{ minWidth: "700px" }}>
      <Pagination
        {...args}
        totalItems={totalItems}
        itemsPerPageOptions={itemsPerPageOptions}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

// --- Stories ---

export const Default = Template.bind({});
Default.args = {
  totalItems: 125,
  itemsPerPageOptions: [10, 25, 50],
};

export const ManyPages = Template.bind({});
ManyPages.args = {
  totalItems: 987,
  itemsPerPageOptions: [15, 30, 45],
};
ManyPages.storyName = "With Many Pages";

export const FewPages = Template.bind({});
FewPages.args = {
  totalItems: 42,
  itemsPerPageOptions: [10, 20, 30],
};
FewPages.storyName = "With Few Pages";

export const OnLastPage = Template.bind({});
const totalItemsForLastPage = 250;
const itemsPerPageForLastPage = 25;
const lastPage = Math.ceil(totalItemsForLastPage / itemsPerPageForLastPage);
OnLastPage.args = {
  totalItems: totalItemsForLastPage,
  itemsPerPageOptions: [itemsPerPageForLastPage, 50, 100],
  initialPage: lastPage, // Start the story on the last page
};
OnLastPage.storyName = "Starting on the Last Page";
