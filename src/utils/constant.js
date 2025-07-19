export const operators = ["in", "notIn"];

export const dateRangeOptions = [
  { label: "Today", value: "today" },
  { label: "This week", value: "this_week" },
  { label: "Last week", value: "last_week" },
  { label: "Last month", value: "last_month" },
  { label: "This month", value: "this_month" },
  { label: "Custom range", value: "custom" },
];

export const extensionMap = {
  // Documents
  doc: {
    type: "document",
    glyphColor: "#1E3A8A",
    labelColor: "#DBEAFE",
    labelTextColor: "#1E3A8A",
  },
  docx: {
    type: "document",
    glyphColor: "#1E3A8A",
    labelColor: "#DBEAFE",
    labelTextColor: "#1E3A8A",
  },
  txt: {
    type: "document",
    glyphColor: "#4B5563",
    labelColor: "#E5E7EB",
    labelTextColor: "#374151",
  },
  rtf: {
    type: "document",
    glyphColor: "#4B5563",
    labelColor: "#E5E7EB",
    labelTextColor: "#374151",
  },

  // Spreadsheets
  xls: {
    type: "spreadsheet",
    glyphColor: "#065F46",
    labelColor: "#D1FAE5",
    labelTextColor: "#065F46",
  },
  csv: {
    type: "spreadsheet",
    glyphColor: "#065F46",
    labelColor: "#D1FAE5",
    labelTextColor: "#065F46",
  },
  xlsx: {
    type: "spreadsheet",
    glyphColor: "#065F46",
    labelColor: "#D1FAE5",
    labelTextColor: "#065F46",
  },

  // Presentations
  ppt: {
    type: "presentation",
    glyphColor: "#B91C1C",
    labelColor: "#FECACA",
    labelTextColor: "#7F1D1D",
  },
  pptx: {
    type: "presentation",
    glyphColor: "#B91C1C",
    labelColor: "#FECACA",
    labelTextColor: "#7F1D1D",
  },

  // PDFs
  pdf: {
    type: "acrobat",
    glyphColor: "#DC2626",
    labelColor: "#FECACA",
    labelTextColor: "#7F1D1D",
  },

  // Images
  jpg: {
    type: "image",
    glyphColor: "#9333EA",
    labelColor: "#EDE9FE",
    labelTextColor: "#6B21A8",
  },
  jpeg: {
    type: "image",
    glyphColor: "#9333EA",
    labelColor: "#EDE9FE",
    labelTextColor: "#6B21A8",
  },
  png: {
    type: "image",
    glyphColor: "#9333EA",
    labelColor: "#EDE9FE",
    labelTextColor: "#6B21A8",
  },
  gif: {
    type: "image",
    glyphColor: "#9333EA",
    labelColor: "#EDE9FE",
    labelTextColor: "#6B21A8",
  },

  // Archives
  zip: {
    type: "archive",
    glyphColor: "#2563EB",
    labelColor: "#DBEAFE",
    labelTextColor: "#1E40AF",
  },
  rar: {
    type: "archive",
    glyphColor: "#2563EB",
    labelColor: "#DBEAFE",
    labelTextColor: "#1E40AF",
  },

  // Code
  js: {
    type: "code",
    glyphColor: "#F59E0B",
    labelColor: "#FEF3C7",
    labelTextColor: "#92400E",
  },
  ts: {
    type: "code",
    glyphColor: "#3B82F6",
    labelColor: "#DBEAFE",
    labelTextColor: "#1E3A8A",
  },
  html: {
    type: "code",
    glyphColor: "#EA580C",
    labelColor: "#FFEDD5",
    labelTextColor: "#7C2D12",
  },
  css: {
    type: "code",
    glyphColor: "#06B6D4",
    labelColor: "#CCFBF1",
    labelTextColor: "#164E63",
  },

  // SVG
  svg: {
    type: "image",
    glyphColor: "#0EA5E9", // Sky blue
    labelColor: "#E0F2FE", // Light blue background
    labelTextColor: "#0369A1", // Dark blue text
  },

  // Audio
  mp3: {
    type: "audio",
    glyphColor: "#10B981", // Emerald green
    labelColor: "#D1FAE5",
    labelTextColor: "#065F46",
  },
  wav: {
    type: "audio",
    glyphColor: "#10B981",
    labelColor: "#D1FAE5",
    labelTextColor: "#065F46",
  },
  aac: {
    type: "audio",
    glyphColor: "#10B981",
    labelColor: "#D1FAE5",
    labelTextColor: "#065F46",
  },
  ogg: {
    type: "audio",
    glyphColor: "#10B981",
    labelColor: "#D1FAE5",
    labelTextColor: "#065F46",
  },

  // Video
  mp4: {
    type: "video",
    glyphColor: "#F97316", // Orange
    labelColor: "#FFEDD5",
    labelTextColor: "#7C2D12",
  },
  mov: {
    type: "video",
    glyphColor: "#F97316",
    labelColor: "#FFEDD5",
    labelTextColor: "#7C2D12",
  },
  avi: {
    type: "video",
    glyphColor: "#F97316",
    labelColor: "#FFEDD5",
    labelTextColor: "#7C2D12",
  },
  mkv: {
    type: "video",
    glyphColor: "#F97316",
    labelColor: "#FFEDD5",
    labelTextColor: "#7C2D12",
  },
  webm: {
    type: "video",
    glyphColor: "#F97316",
    labelColor: "#FFEDD5",
    labelTextColor: "#7C2D12",
  },
  flv: {
    type: "video",
    glyphColor: "#F97316",
    labelColor: "#FFEDD5",
    labelTextColor: "#7C2D12",
  },
};
