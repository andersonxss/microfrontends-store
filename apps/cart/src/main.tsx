import "@mfe/shared/styles.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { addProductToCart } from "./application/cartStore";
import { CartApp } from "./remote/CartApp";
import { CartBadge } from "./remote/CartBadge";
import "./styles.css";

addProductToCart({
  id: "demo-1",
  name: "Produto demonstrativo",
  category: "Demo",
  priceInCents: 9900,
  formattedPrice: "R$ 99,00",
  stock: 1,
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main className="standalone-cart">
      <CartBadge />
      <CartApp />
    </main>
  </React.StrictMode>,
);
