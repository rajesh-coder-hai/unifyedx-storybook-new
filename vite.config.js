import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.js"],
        },
      },
    ],
  },
  build: {
    // 1. Library mode settings
    lib: {
      entry: path.resolve(__dirname, "src/components/index.js"), // Use path.resolve for clarity
      name: "unifyedx-storybook-new",
      fileName: (format) => `unifyedx-storybook-new.${format}.js`,
      formats: ["es"],
    },
    // 2. Externalize peer dependencies
    rollupOptions: {
      external: ["react", "react-dom", "@headlessui/react", "framer-motion"],
      output: {
        // This is crucial for bundling all CSS into one file
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") {
            return "style.css";
          }
          return assetInfo.name;
        },
      },
    },
    // 3. General output settings
    outDir: "dist",
    target: "esnext",
    minify: false,
    sourcemap: false,
  },
});
