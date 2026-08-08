import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import mfConfig from "./module-federation.config";

export default defineConfig({
  base: "http://localhost:4201/",
  resolve: {
    alias: [
      {
        find: "@mfe/shared/styles.css",
        replacement: fileURLToPath(new URL("../../packages/shared/src/styles.css", import.meta.url)),
      },
      {
        find: "@mfe/shared",
        replacement: fileURLToPath(new URL("../../packages/shared/src/index.ts", import.meta.url)),
      },
    ],
  },
  server: {
    origin: "http://localhost:4201",
    port: 4201,
    strictPort: true,
  },
  plugins: [react(), federation(mfConfig)],
  build: {
    target: "chrome89",
  },
});
