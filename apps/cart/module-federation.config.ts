import { createModuleFederationConfig } from "@module-federation/vite";

export default createModuleFederationConfig({
  name: "cart",
  filename: "remoteEntry.js",
  manifest: true,
  dts: false,
  exposes: {
    "./CartApp": "./src/remote/CartApp.tsx",
    "./CartBadge": "./src/remote/CartBadge.tsx",
    "./cartStore": "./src/application/cartStore.ts",
  },
  shared: {
    react: { singleton: true },
    "react/": { singleton: true },
    "react-dom": { singleton: true },
    "react-dom/": { singleton: true },
    "@mfe/shared": { singleton: true },
  },
});
