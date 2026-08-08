export type Product = {
  id: string;
  name: string;
  category: string;
  priceInCents: number;
  stock: number;
};

export function isProductAvailable(product: Product) {
  return product.stock > 0;
}
