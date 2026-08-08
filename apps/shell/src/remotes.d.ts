declare module "products/ProductsApp" {
  import type { AddProductToCart } from "@mfe/shared";
  import type { ComponentType } from "react";

  type ProductsAppProps = {
    userName: string;
    onAddToCart: AddProductToCart;
  };

  const ProductsApp: ComponentType<ProductsAppProps>;
  export { ProductsApp };
  export default ProductsApp;
}

declare module "cart/CartApp" {
  import type { ComponentType } from "react";

  const CartApp: ComponentType;
  export { CartApp };
  export default CartApp;
}

declare module "cart/CartBadge" {
  import type { ComponentType } from "react";

  const CartBadge: ComponentType;
  export { CartBadge };
  export default CartBadge;
}

declare module "cart/cartStore" {
  import type { ProductSummary, CartSnapshot } from "@mfe/shared";

  export function addProductToCart(product: ProductSummary): void;
  export function removeProductFromCart(productId: string): void;
  export function getCartSnapshot(): CartSnapshot;
  export function subscribeToCart(listener: () => void): () => void;
  export function useCartSnapshot(): CartSnapshot;
}
