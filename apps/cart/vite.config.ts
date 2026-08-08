import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mfConfig from "./module-federation.config";

export default defineConfig({
  base: "http://localhost:4202/",
  server: {
    origin: "http://localhost:4202",
    port: 4202,
    strictPort: true,
  },
  plugins: [react(), federation(mfConfig)],
  build: {
    target: "chrome89",
  },
});
