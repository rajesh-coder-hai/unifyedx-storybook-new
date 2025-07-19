import * as yup from "yup";

// Define validation constants
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/octet-stream", // Some systems report DOCX as this
];

// Create the schema
export const fileUploadSchema = yup.object().shape({
  files: yup
    .array()
    .of(
      yup.mixed() // Use yup.mixed() for files
    )
    .min(1, "Please select at least one file to upload.")
    .test(
      "fileSize",
      `Each file must be under ${(MAX_FILE_SIZE_BYTES / 1024 / 1024).toFixed(
        0
      )}MB`,
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE_BYTES)
    )
    .test(
      "fileType",
      "Invalid file type. Supported formats: JPG, PNG, PDF, DOCX.",
      (files) =>
        files.every((file) => {
          const extension = file.name.split(".").pop().toLowerCase();
          return (
            ACCEPTED_MIME_TYPES.includes(file.type) ||
            [".jpg", ".jpeg", ".png", ".pdf", ".docx"].includes(`.${extension}`)
          );
        })
    ),
});
