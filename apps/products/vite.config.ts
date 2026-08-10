import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import { getRemoteConfig } from "../../config/microfrontend-env";
import mfConfig from "./module-federation.config";

const workspaceRoot = fileURLToPath(new URL("../..", import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, workspaceRoot, "");
  const products = getRemoteConfig(env, "products");

  return {
    base: `${products.origin}/`,
    resolve: {
      alias: [
        {
          find: "@mfe/shared/styles.css",
          replacement: fileURLToPath(
            new URL("../../packages/shared/src/styles.css", import.meta.url),
          ),
        },
        {
          find: "@mfe/shared",
          replacement: fileURLToPath(
            new URL("../../packages/shared/src/index.ts", import.meta.url),
          ),
        },
      ],
    },
    server: {
      origin: products.origin,
      port: products.port,
      preTransformRequests: false,
      strictPort: true,
    },
    plugins: [react(), federation(mfConfig)],
    build: {
      target: "chrome89",
    },
  };
});
