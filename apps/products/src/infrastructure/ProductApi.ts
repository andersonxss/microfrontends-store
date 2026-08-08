import type { Product } from "../domain/Product";
import type { ProductRepository } from "../domain/ProductRepository";

const products: Product[] = [
  {
    id: "prod-1",
    name: "Curso Next.js Essencial",
    category: "Frontend",
    priceInCents: 12990,
    stock: 8,
  },
  {
    id: "prod-2",
    name: "Mentoria React Profissional",
    category: "Carreira",
    priceInCents: 34990,
    stock: 3,
  },
  {
    id: "prod-3",
    name: "Workshop UI Architecture",
    category: "Arquitetura",
    priceInCents: 8990,
    stock: 0,
  },
  {
    id: "prod-4",
    name: "Guia TypeScript Aplicado",
    category: "Linguagem",
    priceInCents: 5990,
    stock: 15,
  },
];

export class ProductApi implements ProductRepository {
  async findAll() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return products;
  }
}
