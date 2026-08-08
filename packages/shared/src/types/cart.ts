export type CartItem = {
  id: string;
  name: string;
  priceInCents: number;
  quantity: number;
};

export type CartSnapshot = {
  items: CartItem[];
  quantity: number;
  totalInCents: number;
  formattedTotal: string;
};
