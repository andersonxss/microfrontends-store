/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SHELL_REMOTE_URL: string;
  readonly VITE_PRODUCTS_REMOTE_URL: string;
  readonly VITE_CART_REMOTE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
