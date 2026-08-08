import type { Product } from "./Product";

export type ProductRepository = {
  findAll(): Promise<Product[]>;
};
