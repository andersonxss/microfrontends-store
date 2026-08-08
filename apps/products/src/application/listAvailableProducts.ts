import { formatCurrency, type ProductSummary } from "@mfe/shared";
import { isProductAvailable } from "../domain/Product";
import type { ProductRepository } from "../domain/ProductRepository";

export async function listAvailableProducts(
  repository: ProductRepository,
): Promise<ProductSummary[]> {
  const products = await repository.findAll();

  return products.filter(isProductAvailable).map((product) => ({
    ...product,
    formattedPrice: formatCurrency(product.priceInCents),
  }));
}
