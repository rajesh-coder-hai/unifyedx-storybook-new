import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { AlertTriangle, Info, Trash2 } from "lucide-react";
import React, { Fragment } from "react";
import { UnifyedCoreButton as Button } from "../UnifyedCoreButton/UnifyedCoreButton";
import "./Modal.css";

const variantConfig = {
  delete: {
    icon: Trash2,
    iconClass: "icon--delete",
    primaryButtonCategory: "danger", // Assuming you add a 'danger' category to your Button
  },
  warning: {
    icon: AlertTriangle,
    iconClass: "icon--warning",
    primaryButtonCategory: "warning", // Assuming a 'warning' category
  },
  info: {
    icon: Info,
    iconClass: "icon--info",
    primaryButtonCategory: "primary",
  },
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  children, // For the description/body content
  primaryButtonText = "Confirm",
  secondaryButtonText = "Cancel",
  variant = "info", // 'info', 'warning', 'delete'
}) => {
  const config = variantConfig[variant] || variantConfig.info;
  const Icon = config.icon;

  const handlePrimaryClick = () => {
    onClose({ primary: true, secondary: false });
  };

  const handleSecondaryClick = () => {
    onClose({ primary: false, secondary: true });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="modal-dialog" onClose={() => onClose({})}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="modal-overlay" />
        </TransitionChild>

        <div className="modal-positioner">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="modal-panel">
              <div className="modal-content-wrapper">
                <div className={`modal-icon-container ${config.iconClass}`}>
                  <Icon size={24} aria-hidden="true" />
                </div>
                <div className="modal-text-content">
                  <DialogTitle as="h3" className="modal-title">
                    {title}
                  </DialogTitle>
                  <div className="modal-description">{children}</div>
                </div>
              </div>

              <div className="modal-footer">
                <Button
                  onClick={handleSecondaryClick}
                  label={secondaryButtonText}
                  category="secondary"
                />
                <Button
                  onClick={handlePrimaryClick}
                  label={primaryButtonText}
                  //   category={config.primaryButtonCategory}
                />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
