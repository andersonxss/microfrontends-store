import "@mfe/shared/styles.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { ProductsApp } from "./remote/ProductsApp";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductsApp
      userName="Standalone"
      onAddToCart={(product) => {
        console.log("Produto selecionado pelo remote products:", product);
      }}
    />
  </React.StrictMode>,
);
