import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Fragment } from "react";
import { UnifyedCoreButton as Button } from "../UnifyedCoreButton/UnifyedCoreButton";
import "./ButtonWithDropdown.css"; // ✅ Import the stylesheet

export default function ButtonWithDropdown({
  options = [],
  disabled = false,
  // ✅ All button-related props are passed in this object
  buttonProps = { label: "Options", category: "primary", size: "medium" },
}) {
  return (
    <Menu as="div" className="dropdown-wrapper">
      <MenuButton as={Fragment}>
        {/* The trigger button is now completely dynamic */}
        <Button disabled={disabled} {...buttonProps}>
          {/*
            The Button will now render its OWN label and icon from buttonProps.
            We are only passing the ChevronDown as a child to be rendered at the end.
          */}
          <ChevronDown
            size={16}
            aria-hidden="true"
            style={{ marginLeft: "auto" }}
          />
        </Button>
      </MenuButton>

      <MenuItems anchor="bottom end" className="dropdown-menu">
        {options.map((option) => (
          <div key={option.id || option.label}>
            {option.dividerBefore ? (
              <div className="dropdown-divider" />
            ) : (
              <MenuItem>
                <button onClick={option.onClick} className="dropdown-menu-item">
                  {option.icon && (
                    <span className="item-icon">{option.icon}</span>
                  )}
                  {option.label}
                </button>
              </MenuItem>
            )}
          </div>
        ))}
      </MenuItems>
    </Menu>
  );
}
