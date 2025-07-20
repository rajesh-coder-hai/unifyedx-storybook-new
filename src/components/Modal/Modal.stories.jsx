import { useState } from "react";
import { Button } from "../Button/Button";
import { Modal } from "./Modal";

export default {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    isOpen: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
};

// --- Template for demonstrating modal interaction ---
const ModalTemplate = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (result) => {
    setIsOpen(false);
    if (result.primary) {
      alert(`You clicked: ${args.primaryButtonText || "Confirm"}`);
    } else if (result.secondary) {
      alert(`You clicked: ${args.secondaryButtonText || "Cancel"}`);
    } else {
      alert("Modal closed (e.g., via Escape key or overlay click)");
    }
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} label="Open Modal" />
      <Modal {...args} isOpen={isOpen} onClose={handleClose}>
        {args.children}
      </Modal>
    </div>
  );
};

export const DeleteConfirmation = ModalTemplate.bind({});
DeleteConfirmation.args = {
  variant: "delete",
  title: "Are you sure you want to delete?",
  children:
    "This action cannot be undone, and the item will be permanently removed.",
  primaryButtonText: "Delete",
  secondaryButtonText: "Cancel",
};

export const Warning = ModalTemplate.bind({});
Warning.args = {
  variant: "warning",
  title: "Unsaved Changes",
  children:
    "You have unsaved changes. Are you sure you want to leave this page?",
  primaryButtonText: "Leave Page",
  secondaryButtonText: "Stay",
};

export const Informational = ModalTemplate.bind({});
Informational.args = {
  variant: "info",
  title: "Update Available",
  children:
    "A new version of the application is available. Please refresh your browser.",
  primaryButtonText: "Okay",
  secondaryButtonText: "Later",
};
