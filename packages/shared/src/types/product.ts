export type ProductSummary = {
  id: string;
  name: string;
  category: string;
  priceInCents: number;
  formattedPrice: string;
  stock: number;
};

export type AddProductToCart = (product: ProductSummary) => void | Promise<void>;
