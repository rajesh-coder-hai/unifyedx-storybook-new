import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// Import the Syncfusion license registration method
// import { registerLicense } from "@syncfusion/ej2-base";

// registerLicense(
//   import.meta.env.VITE_APP_SYNCFUSION_LICENSE_KEY ||
//     "Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXhfcXRcQmZdVENzWkRWYUE="
// );

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
