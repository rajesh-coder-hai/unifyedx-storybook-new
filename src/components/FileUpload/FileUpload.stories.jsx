import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { UnifyedCoreButton as Button } from "../UnifyedCoreButton/UnifyedCoreButton";
import { FileUploadModal } from "./FileUploadModal";

// --- Story Setup: Define Schema and Parent Component Logic ---

// 1. A basic schema for the story
const storySchema = yup.object().shape({
  filesToUpload: yup.array().min(1, "Please select at least one file."),
});

// 2. The "Parent Component" Template that holds all the logic
const StoryProvider = ({
  dropzoneAcceptConfig,
  multiple = true,
  maxSize = 50000000, // 50MB
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rejectedFiles, setRejectedFiles] = useState([]);

  // --- React Hook Form Setup ---
  const methods = useForm({
    resolver: yupResolver(storySchema),
    defaultValues: { filesToUpload: [] },
  });
  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = methods;

  const validFiles = watch("filesToUpload");

  // --- Dropzone Logic ---
  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      const currentValidFiles = getValues("filesToUpload") || [];
      setValue("filesToUpload", [...currentValidFiles, ...acceptedFiles], {
        shouldValidate: true,
        shouldDirty: true,
      });

      const newRejectedFiles = fileRejections.map(({ file, errors }) => ({
        file,
        message: errors[0].message,
      }));
      setRejectedFiles((current) => [...current, ...newRejectedFiles]);
    },
    [getValues, setValue]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true, // Let our custom button handle it
    noKeyboard: true,
    maxSize,
    accept: dropzoneAcceptConfig,
    multiple,
  });

  // --- File Handling Logic ---
  const handleRemoveValidFile = (indexToRemove) => {
    const updatedFiles = validFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setValue("filesToUpload", updatedFiles, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  const handleRemoveRejectedFile = (indexToRemove) => {
    setRejectedFiles((current) =>
      current.filter((_, index) => index !== indexToRemove)
    );
  };

  // --- Validation Effect ---
  useEffect(() => {
    if (rejectedFiles.length > 0) {
      setError("filesToUpload", {
        type: "manual",
        message: "Some files were rejected. Please remove them to continue.",
      });
    } else if (errors.filesToUpload?.type === "manual") {
      clearErrors("filesToUpload");
    }
  }, [rejectedFiles, setError, clearErrors, errors.filesToUpload]);

  // --- Form Submission ---
  const handleFormSubmit = (data) => {
    console.log("Form Submitted with valid files:", data.filesToUpload);
    alert(`${data.filesToUpload.length} file(s) are ready for upload!`);
    setIsOpen(false); // Close modal on submit
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} label="Open Upload Modal" />
      <FileUploadModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        // Dropzone props
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        open={open}
        // File state props
        validFiles={validFiles}
        rejectedFiles={rejectedFiles}
        handleRemoveValidFile={handleRemoveValidFile}
        handleRemoveRejectedFile={handleRemoveRejectedFile}
        // Form props
        handleSubmit={handleSubmit(handleFormSubmit)}
        isSubmitting={isSubmitting}
        formErrors={errors}
      />
    </div>
  );
};

// --- Storybook Configuration ---
export default {
  title: "Components/FileUploadModal",
  component: StoryProvider, // The story now renders our provider
  argTypes: {
    multiple: { control: "boolean", description: "Allow multiple files" },
    maxSize: { control: "number", description: "Max file size in bytes" },
  },
};

export const Default = {
  args: {
    multiple: true,
    maxSize: 50000000, // 50MB
    dropzoneAcceptConfig: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
  },
};

export const SingleSmallImageOnly = {
  args: {
    multiple: false,
    maxSize: 1000000, // 1MB
    dropzoneAcceptConfig: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  },
};
