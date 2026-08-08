import { createModuleFederationConfig } from "@module-federation/vite";

export default createModuleFederationConfig({
  name: "products",
  filename: "remoteEntry.js",
  manifest: true,
  dts: false,
  exposes: {
    "./ProductsApp": "./src/remote/ProductsApp.tsx",
  },
  shared: {
    react: { singleton: true },
    "react/": { singleton: true },
    "react-dom": { singleton: true },
    "react-dom/": { singleton: true },
  },
});
