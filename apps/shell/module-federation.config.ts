import { createModuleFederationConfig } from "@module-federation/vite";

export default createModuleFederationConfig({
  name: "shell",
  manifest: true,
  dts: false,
  remotes: {
    products: {
      type: "module",
      name: "products",
      entry: "http://localhost:4201/remoteEntry.js",
    },
    cart: {
      type: "module",
      name: "cart",
      entry: "http://localhost:4202/remoteEntry.js",
    },
  },
  shared: {
    react: { singleton: true },
    "react/": { singleton: true },
    "react-dom": { singleton: true },
    "react-dom/": { singleton: true },
  },
});
