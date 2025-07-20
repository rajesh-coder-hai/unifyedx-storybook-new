import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment } from "react";
import { ArrowLeft, X } from "lucide-react";
import "./WizardModal.css";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export const WizardModal = ({
  isOpen,
  onClose,
  steps = {},
  currentStep,
  direction = 1,
  stepProps = {},
  title,
  description,
  showProgress = true,
  closeOnOverlayClick = true,
}) => {
  const CurrentStepComponent = steps[currentStep];
  const stepKeys = Object.keys(steps);
  const currentStepIndex = stepKeys.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / stepKeys.length) * 100;

  const showBackButton = currentStepIndex > 0 && stepProps.onBack;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="wizard-dialog"
        onClose={closeOnOverlayClick ? onClose : () => {}}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="wizard-overlay" aria-hidden="true" />
        </TransitionChild>

        <div className="wizard-container">
          <div className="wizard-positioner">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="wizard-panel">
                <header className="wizard-header">
                  <div className="wizard-header-content">
                    {showBackButton && (
                      <button
                        onClick={stepProps.onBack}
                        className="wizard-back-button"
                        aria-label="Go back to previous step"
                      >
                        <ArrowLeft size={20} />
                      </button>
                    )}
                    <div className="wizard-header-text">
                      <Dialog.Title as="h3" className="wizard-title">
                        {title}
                      </Dialog.Title>
                      {description && (
                        <Dialog.Description className="wizard-description">
                          {description}
                        </Dialog.Description>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="wizard-close-button"
                    aria-label="Close modal"
                  >
                    <X size={24} />
                  </button>
                </header>

                {showProgress && (
                  <div className="wizard-progress-container">
                    <div
                      className="wizard-progress-bar"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                <div className="wizard-body">
                  <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode="wait"
                  >
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        opacity: { duration: 0.2 },
                      }}
                      className="wizard-step-motion-wrapper"
                      style={{ overflowX: "hidden" }} // Add this inline style as well
                    >
                      {CurrentStepComponent && (
                        <CurrentStepComponent {...stepProps} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
