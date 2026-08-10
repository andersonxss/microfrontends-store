import { useSyncExternalStore } from "react";
import type { CartSnapshot, ProductSummary } from "@mfe/shared";
import {
  addProduct,
  removeProduct,
  toCartSnapshot,
  type Cart,
} from "../domain/Cart";

let cart: Cart = {
  items: [],
};

let snapshot: CartSnapshot = toCartSnapshot(cart);

const listeners = new Set<() => void>();

export function addProductToCart(product: ProductSummary) {
  cart = addProduct(cart, product);
  snapshot = toCartSnapshot(cart);
  notify();
}

export function removeProductFromCart(productId: string) {
  cart = removeProduct(cart, productId);
  snapshot = toCartSnapshot(cart);
  notify();
}

export function getCartSnapshot(): CartSnapshot {
  return snapshot;
}

export function subscribeToCart(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function useCartSnapshot() {
  return useSyncExternalStore(subscribeToCart, getCartSnapshot, getCartSnapshot);
}

function notify() {
  listeners.forEach((listener) => listener());
}
