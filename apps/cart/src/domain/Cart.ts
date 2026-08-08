import { formatCurrency, type CartItem, type ProductSummary } from "@mfe/shared";

export type Cart = {
  items: CartItem[];
};

export function addProduct(cart: Cart, product: ProductSummary): Cart {
  const currentItem = cart.items.find((item) => item.id === product.id);

  if (currentItem) {
    return {
      items: cart.items.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    };
  }

  return {
    items: [
      ...cart.items,
      {
        id: product.id,
        name: product.name,
        priceInCents: product.priceInCents,
        quantity: 1,
      },
    ],
  };
}

export function removeProduct(cart: Cart, productId: string): Cart {
  return {
    items: cart.items
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      )
      .filter((item) => item.quantity > 0),
  };
}

export function getCartQuantity(cart: Cart) {
  return cart.items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotalInCents(cart: Cart) {
  return cart.items.reduce(
    (total, item) => total + item.priceInCents * item.quantity,
    0,
  );
}

export function toCartSnapshot(cart: Cart) {
  const totalInCents = getCartTotalInCents(cart);

  return {
    items: cart.items,
    quantity: getCartQuantity(cart),
    totalInCents,
    formattedTotal: formatCurrency(totalInCents),
  };
}
