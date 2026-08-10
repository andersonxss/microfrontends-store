import { createModuleFederationConfig } from "@module-federation/vite";
import { getRemoteConfig, type MicrofrontendEnv } from "../../config/microfrontend-env";

export function createShellModuleFederationConfig(env: MicrofrontendEnv) {
  const products = getRemoteConfig(env, "products");
  const cart = getRemoteConfig(env, "cart");

  return createModuleFederationConfig({
    name: "shell",
    manifest: true,
    dts: false,
    remotes: {
      products: {
        type: "module",
        name: "products",
        entry: `${products.origin}/remoteEntry.js`,
      },
      cart: {
        type: "module",
        name: "cart",
        entry: `${cart.origin}/remoteEntry.js`,
      },
    },
    shared: {
      react: { singleton: true },
      "react/": { singleton: true },
      "react-dom": { singleton: true },
      "react-dom/": { singleton: true },
    },
  });
}
