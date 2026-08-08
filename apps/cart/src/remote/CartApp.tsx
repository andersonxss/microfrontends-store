import { Button, Card } from "@mfe/shared";
import { removeProductFromCart, useCartSnapshot } from "../application/cartStore";

export function CartApp() {
  const snapshot = useCartSnapshot();

  return (
    <section className="cart-remote">
      <div>
        <p className="eyebrow">Remote cart</p>
        <h2>Carrinho</h2>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {snapshot.items.length ? (
            snapshot.items.map((item) => (
              <Card key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <p>
                    {item.quantity} x{" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.priceInCents / 100)}
                  </p>
                </div>
                <Button
                  variant="danger"
                  aria-label={`Remover ${item.name}`}
                  onClick={() => removeProductFromCart(item.id)}
                >
                  -
                </Button>
              </Card>
            ))
          ) : (
            <div className="empty-state">
              Carrinho vazio. Adicione um produto pelo catalogo.
            </div>
          )}
        </div>

        <aside className="cart-summary">
          <span>Quantidade total</span>
          <strong>{snapshot.quantity} itens</strong>
          <span>Total</span>
          <strong className="total">{snapshot.formattedTotal}</strong>
        </aside>
      </div>
    </section>
  );
}

export default CartApp;
