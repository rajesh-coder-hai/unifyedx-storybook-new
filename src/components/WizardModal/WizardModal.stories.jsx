import React, { useState } from "react";
import { WizardModal } from "./WizardModal";
import { UnifyedCoreButton as Button } from "../UnifyedCoreButton/UnifyedCoreButton";
import {
  ArrowRight,
  Check,
  Plus,
  User,
  Settings,
  CreditCard,
} from "lucide-react";

export default {
  title: "Components/WizardModal",
  component: WizardModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A multi-step modal wizard with smooth transitions between steps. Perfect for onboarding flows, complex forms, or any multi-step process.",
      },
    },
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls the visibility of the modal",
    },
    title: {
      control: "text",
      description: "Title displayed in the modal header",
    },
    description: {
      control: "text",
      description: "Optional description under the title",
    },
    showProgress: {
      control: "boolean",
      description: "Show/hide the progress bar",
    },
    closeOnOverlayClick: {
      control: "boolean",
      description: "Allow closing by clicking outside the modal",
    },
  },
};

// Step Components
const Step1 = ({ onNext }) => (
  <div className="wizard-step">
    <div className="wizard-step-icon">
      <User size={48} className="text-blue-500" />
    </div>
    <h3 className="wizard-step-title">Personal Information</h3>
    <p className="wizard-step-description">
      Please provide your basic information to get started.
    </p>
    <div className="wizard-step-content">
      <div className="form-group">
        <label>Full Name</label>
        <input type="text" placeholder="Enter your name" />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input type="email" placeholder="Enter your email" />
      </div>
    </div>
    <div className="wizard-step-footer">
      <Button category="primary" onClick={onNext} icon={ArrowRight}>
        Continue
      </Button>
    </div>
  </div>
);

const Step2 = ({ onNext, onBack }) => (
  <div className="wizard-step">
    <div className="wizard-step-icon">
      <Settings size={48} className="text-purple-500" />
    </div>
    <h3 className="wizard-step-title">Account Setup</h3>
    <p className="wizard-step-description">
      Configure your account preferences.
    </p>
    <div className="wizard-step-content">
      <div className="form-group">
        <label>Username</label>
        <input type="text" placeholder="Choose a username" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" placeholder="Create a password" />
      </div>
      <div className="form-group">
        <label>Timezone</label>
        <select>
          <option>Select your timezone</option>
          <option>GMT</option>
          <option>EST</option>
          <option>PST</option>
        </select>
      </div>
    </div>
    <div className="wizard-step-footer">
      <Button variant="secondary" onClick={onBack}>
        Back
      </Button>
      <Button variant="primary" onClick={onNext} icon={ArrowRight}>
        Continue
      </Button>
    </div>
  </div>
);

const Step3 = ({ onComplete, onBack }) => (
  <div className="wizard-step">
    <div className="wizard-step-icon">
      <CreditCard size={48} className="text-green-500" />
    </div>
    <h3 className="wizard-step-title">Payment Information</h3>
    <p className="wizard-step-description">
      Enter your payment details to complete registration.
    </p>
    <div className="wizard-step-content">
      <div className="form-group">
        <label>Card Number</label>
        <input type="text" placeholder="1234 5678 9012 3456" />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Expiry Date</label>
          <input type="text" placeholder="MM/YY" />
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input type="text" placeholder="123" />
        </div>
      </div>
    </div>
    <div className="wizard-step-footer">
      <Button variant="secondary" onClick={onBack}>
        Back
      </Button>
      <Button variant="primary" onClick={onComplete} icon={Check}>
        Complete Registration
      </Button>
    </div>
  </div>
);

const SuccessStep = ({ onClose }) => (
  <div className="wizard-step">
    <div className="wizard-step-icon success">
      <Check size={48} className="text-green-500" />
    </div>
    <h3 className="wizard-step-title">Registration Complete!</h3>
    <p className="wizard-step-description">
      Your account has been successfully created. You can now access all
      features.
    </p>
    <div className="wizard-step-content">
      <div className="success-message">
        <p>We've sent a confirmation email to your address.</p>
        <p>Please verify your email to complete the process.</p>
      </div>
    </div>
    <div className="wizard-step-footer">
      <Button variant="primary" onClick={onClose}>
        Get Started
      </Button>
    </div>
  </div>
);

// Template
const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState("step1");
  const [direction, setDirection] = useState(1);

  const steps = {
    step1: Step1,
    step2: Step2,
    step3: Step3,
    success: SuccessStep,
  };

  const handleNext = () => {
    setDirection(1);
    if (currentStep === "step1") setCurrentStep("step2");
    else if (currentStep === "step2") setCurrentStep("step3");
    else if (currentStep === "step3") setCurrentStep("success");
  };

  const handleBack = () => {
    setDirection(-1);
    if (currentStep === "step2") setCurrentStep("step1");
    else if (currentStep === "step3") setCurrentStep("step2");
  };

  const handleComplete = () => {
    setDirection(1);
    setCurrentStep("success");
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset to first step when closed
    setTimeout(() => setCurrentStep("step1"), 300);
  };

  const stepProps = {
    onNext: handleNext,
    onBack: handleBack,
    onComplete: handleComplete,
    onClose: handleClose,
  };

  return (
    <div>
      <Button
        variant="primary"
        onClick={() => setIsOpen(true)}
        icon={Plus} //{<Plus size={16} />}
      >
        Open Wizard
      </Button>

      <WizardModal
        {...args}
        isOpen={isOpen}
        onClose={handleClose}
        steps={steps}
        currentStep={currentStep}
        direction={direction}
        stepProps={stepProps}
      />
    </div>
  );
};

// Stories
export const Default = Template.bind({});
Default.args = {
  title: "Account Registration",
  description: "Complete these steps to create your account",
  showProgress: true,
  closeOnOverlayClick: true,
};

export const WithoutProgressBar = Template.bind({});
WithoutProgressBar.args = {
  ...Default.args,
  showProgress: false,
};

export const WithLongTitle = Template.bind({});
WithLongTitle.args = {
  ...Default.args,
  title: "Multi-step Account Registration Wizard Flow",
  description:
    "This wizard will guide you through the complete account setup process including personal details, preferences and payment information",
};

export const Minimal = Template.bind({});
Minimal.args = {
  title: "Quick Setup",
  description: "",
  showProgress: false,
};

export const DisabledOverlayClose = Template.bind({});
DisabledOverlayClose.args = {
  ...Default.args,
  closeOnOverlayClick: false,
};

// CSS for the story (could also be in a separate file)
const styles = `
  .wizard-step {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1rem 0;
  }
  
  .wizard-step-icon {
    margin: 0 auto 1.5rem;
    display: flex;
    justify-content: center;
  }
  
  .wizard-step-icon.success {
    background-color: #f0fdf4;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }
  
  .wizard-step-title {
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    margin: 0 0 0.5rem;
    color: #111827;
  }
  
  .wizard-step-description {
    text-align: center;
    color: #6b7280;
    margin-bottom: 2rem;
    padding: 0 1rem;
  }
  
  .wizard-step-content {
    flex-grow: 1;
    margin-bottom: 2rem;
  }
  
  .wizard-step-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 0.625rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background-color: white;
  }
  
  .form-row {
    display: flex;
    gap: 1rem;
  }
  
  .form-row .form-group {
    flex: 1;
  }
  
  .success-message {
    text-align: center;
    color: #374151;
    line-height: 1.6;
  }
`;

export const Playground = Template.bind({});
Playground.args = {
  ...Default.args,
};
Playground.parameters = {
  docs: {
    description: {
      story:
        "Interact with the controls below to customize the WizardModal behavior and appearance.",
    },
  },
};

// Add styles to the story
const withStyles = (Story) => (
  <>
    <style>{styles}</style>
    <Story />
  </>
);

Default.decorators = [withStyles];
WithoutProgressBar.decorators = [withStyles];
WithLongTitle.decorators = [withStyles];
Minimal.decorators = [withStyles];
DisabledOverlayClose.decorators = [withStyles];
Playground.decorators = [withStyles];
