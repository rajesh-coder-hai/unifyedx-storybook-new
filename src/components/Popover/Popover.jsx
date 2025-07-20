import {
  Popover as HeadlessPopover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import React from "react";
import "./Popover.css";

export const Popover = ({ children }) => {
  return (
    <HeadlessPopover className="popover-container">{children}</HeadlessPopover>
  );
};

export const PopoverTrigger = ({ children }) => {
  return <PopoverButton as="div">{children}</PopoverButton>;
};

export const PopoverContent = ({ children, className }) => {
  return (
    <PopoverPanel className={`popover-panel ${className || ""}`}>
      {children}
    </PopoverPanel>
  );
};
