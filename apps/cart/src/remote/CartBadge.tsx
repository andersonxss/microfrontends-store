import { useCartSnapshot } from "../application/cartStore";

export function CartBadge() {
  const snapshot = useCartSnapshot();

  return (
    <span className="cart-badge" title="Itens no carrinho">
      {snapshot.quantity}
    </span>
  );
}

export default CartBadge;
