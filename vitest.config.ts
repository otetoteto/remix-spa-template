/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    exclude: ["**/node_modules/**", "**/build/**", "**/*.integration.test.ts"],
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
