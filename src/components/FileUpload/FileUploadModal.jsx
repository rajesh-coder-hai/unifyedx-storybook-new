import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FileQuestion, Trash2, UploadCloud, X } from "lucide-react";
import { Fragment } from "react";
import { FileIcon } from "react-file-icon";
import { UnifyedCoreButton as Button } from "../UnifyedCoreButton/UnifyedCoreButton";
import "./FileUploadModal.css";
import { extensionMap } from "../../utils/constant";
import { CustomFileIcon } from "../../utils/OtherIcons";

// Helper functions and CustomFileIcon can remain here or be moved to a utils file
const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

// const CustomFileIcon = ({ extension, ...props }) => {
//   // Assuming extensionMap is defined elsewhere or passed in

//   const iconProps = extensionMap[extension?.toLowerCase()];
//   if (iconProps)
//     return (
//       <FileIcon extension={extension} {...iconProps} {...props} radius={4} />
//     );
//   return <FileQuestion className="text-gray-400" size={32} />;
// };

export const FileUploadModal = ({
  // --- Modal Control ---
  isOpen,
  onClose,
  // --- Dropzone Props ---
  getRootProps,
  getInputProps,
  isDragActive,
  open,
  // --- Form and File State ---
  validFiles = [],
  rejectedFiles = [],
  handleRemoveValidFile,
  handleRemoveRejectedFile,
  handleSubmit,
  isSubmitting,
  formErrors,
  // --- UI Text ---
  title = "Upload Files",
  subHeading = "Supports PNG, JPG, PDF. Max size: 50MB.",
}) => {
  const hasFiles = validFiles.length > 0 || rejectedFiles.length > 0;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      {/* Spread getRootProps onto the Dialog itself to make the entire modal a dropzone */}
      <Dialog
        as="div"
        className="file-upload-dialog"
        onClose={onClose}
        {...getRootProps()}
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
          <div className="dialog-overlay" />
        </TransitionChild>

        <div className="dialog-positioner">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
              className="dialog-panel"
              onClick={(e) => e.stopPropagation()}
            >
              {/* The input MUST be a direct child for react-dropzone's open() to work */}
              <input {...getInputProps()} />

              <form onSubmit={handleSubmit} className="form-wrapper">
                <div className="dialog-header">
                  <DialogTitle as="h3" className="dialog-title-text">
                    {title}
                  </DialogTitle>
                  <button
                    type="button"
                    onClick={onClose}
                    className="close-button"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="dialog-body">
                  {/* Dropzone UI Area */}
                  <div
                    className={`dropzone-ui ${
                      isDragActive ? "dropzone-ui--active" : ""
                    }`}
                  >
                    <UploadCloud size={48} className="text-gray-400" />
                    <p>Drag and drop files here</p>
                    <p className="sub-heading">{subHeading}</p>
                    <hr />
                    <p>OR</p>
                    <button
                      type="button"
                      onClick={open}
                      className="browse-button"
                    >
                      Browse Files
                    </button>
                  </div>

                  {/* Validation Errors */}
                  {formErrors.filesToUpload && (
                    <p className="form-error-message">
                      {formErrors.filesToUpload.message}
                    </p>
                  )}

                  {/* File Lists */}
                  {hasFiles && (
                    <div className="file-list-container">
                      <h3>Upload Queue</h3>
                      <ul className="file-list">
                        {validFiles.map((file, index) => (
                          <li
                            key={`${file.name}-${index}`}
                            className="file-item"
                          >
                            <div className="file-item-details">
                              <CustomFileIcon
                                extension={file.name.split(".").pop()}
                              />
                              <div>
                                <p className="file-item-name">{file.name}</p>
                                <p className="file-item-size">
                                  {formatBytes(file.size)}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveValidFile(index)}
                              className="remove-file-button"
                            >
                              <Trash2 size={16} />
                            </button>
                          </li>
                        ))}
                        {rejectedFiles.map(({ file, message }, index) => (
                          <li
                            key={`${file.name}-${index}`}
                            className="file-item file-item--rejected"
                          >
                            <div className="file-item-details">
                              <CustomFileIcon
                                extension={file.name.split(".").pop()}
                              />
                              <div>
                                <p className="file-item-name">{file.name}</p>
                                <p className="file-item-size">
                                  {formatBytes(file.size)}
                                </p>
                                {/* The error message is now part of the main text block */}
                                <p className="rejection-reason">{message}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveRejectedFile(index)}
                              className="remove-file-button"
                            >
                              <Trash2 size={16} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="dialog-footer">
                  <Button
                    type="button"
                    category="secondary"
                    onClick={onClose}
                    label="Cancel"
                  />
                  <Button
                    type="submit"
                    label={isSubmitting ? "Uploading..." : "Upload Files"}
                    loader={isSubmitting}
                    disabled={validFiles.length === 0 || isSubmitting}
                  />
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
