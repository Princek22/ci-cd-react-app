import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["src/**/*.{test,spec}.{js,jsx}"],

    exclude: [
      "**/node_modules/**",
      "**/.git/**",
      "**/dist/**",
      "**/coverage/**",
      "backend/**",
    ],

    environment: "jsdom",
    setupFiles: "./src/setupTests.js",

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: [
        "node_modules/",
        "src/assets/",
        "**/*.css",
        "src/setupTests.js",
        "**/*.test.*",
      ],
    },
  },
});
