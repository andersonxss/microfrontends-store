import {
  Button,
  Card,
  type AddProductToCart,
  type ProductSummary,
} from "@mfe/shared";
import { useEffect, useMemo, useState } from "react";
import { listAvailableProducts } from "../application/listAvailableProducts";
import { ProductApi } from "../infrastructure/ProductApi";

type ProductsAppProps = {
  userName: string;
  onAddToCart: AddProductToCart;
};

const repository = new ProductApi();

export function ProductsApp({ userName, onAddToCart }: ProductsAppProps) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    listAvailableProducts(repository).then((data) => {
      if (isActive) {
        setProducts(data);
        setIsLoading(false);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
    );
  }, [products, search]);

  return (
    <section className="products-remote">
      <div className="remote-toolbar">
        <div>
          <p className="eyebrow">Remote products</p>
          <h2>Produtos</h2>
          <p className="muted">Catalogo carregado para {userName}.</p>
        </div>
        <label className="search-field">
          Buscar produto
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Nome ou categoria"
          />
        </label>
      </div>

      {isLoading ? (
        <div className="empty-state">Carregando produtos...</div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="product-card">
              <span className="category">{product.category}</span>
              <h3>{product.name}</h3>
              <div className="product-meta">
                <span>{product.stock} em estoque</span>
                <strong>{product.formattedPrice}</strong>
              </div>
              <Button onClick={() => onAddToCart(product)}>
                Adicionar ao carrinho
              </Button>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductsApp;
