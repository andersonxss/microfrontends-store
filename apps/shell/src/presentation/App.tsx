import { Button, Card } from "@mfe/shared";
import { lazy, Suspense } from "react";
import type { ProductSummary } from "@mfe/shared";
import { canAccess, getSession } from "../auth/session";
import { type AppRoute, useHashRoute } from "../router/useHashRoute";

const LazyProductsApp = lazy(() => import("products/ProductsApp"));
const LazyCartApp = lazy(() => import("cart/CartApp"));
const LazyCartBadge = lazy(() => import("cart/CartBadge"));

const session = getSession();

export function App() {
  const route = useHashRoute();

  return (
    <div className="shell">
      <header className="shell-header">
        <a className="brand" href="#/">
          <span className="brand-mark">MF</span>
          <strong>Shell Store</strong>
        </a>
        <nav className="shell-nav" aria-label="Principal">
          <NavLink href="#/" route="/" currentRoute={route}>
            Inicio
          </NavLink>
          <NavLink href="#/products" route="/products" currentRoute={route}>
            Produtos
          </NavLink>
          <NavLink href="#/cart" route="/cart" currentRoute={route}>
            Carrinho
          </NavLink>
        </nav>
        <div className="session">
          <span>
            Autenticado como <strong>{session.name}</strong>
          </span>
          <Suspense fallback={<span className="cart-badge-skeleton">0</span>}>
            <LazyCartBadge />
          </Suspense>
        </div>
      </header>

      <main className="shell-main">
        <section className="shell-hero">
          <p className="eyebrow">Vite + Module Federation + TypeScript</p>
          <h1>Shell host consumindo produtos e carrinho em runtime.</h1>
          <p>
            O shell cuida de layout, menu, autenticacao e rotas. Os remotes
            preservam suas proprias telas, regras e estado.
          </p>
        </section>

        <Suspense fallback={<RemoteFallback />}>{renderRoute(route)}</Suspense>
      </main>
    </div>
  );
}

function renderRoute(route: AppRoute) {
  if (route === "/products") {
    if (!canAccess(session, "products:read")) {
      return <Card>Usuario sem permissao para produtos.</Card>;
    }

    return (
      <LazyProductsApp
        userName={session.name}
        onAddToCart={async (product: ProductSummary) => {
          const { addProductToCart } = await import("cart/cartStore");
          addProductToCart(product);
        }}
      />
    );
  }

  if (route === "/cart") {
    if (!canAccess(session, "cart:write")) {
      return <Card>Usuario sem permissao para carrinho.</Card>;
    }

    return <LazyCartApp />;
  }

  return <Dashboard />;
}

function Dashboard() {
  return (
    <div className="dashboard-grid">
      <Card className="dashboard-panel">
        <h2>Como estudar este projeto</h2>
        <p>
          Abra produtos, adicione itens e navegue para carrinho. O contrato
          entre apps acontece por imports federados e props explicitas.
        </p>
        <div className="flow">
          <span>1</span>
          <p>Products expoe `ProductsApp`.</p>
          <span>2</span>
          <p>Cart expoe `CartApp`, `CartBadge` e `cartStore`.</p>
          <span>3</span>
          <p>Shell integra os remotes e aplica permissao de usuario.</p>
        </div>
        <a href="#/products">
          <Button>Ver produtos</Button>
        </a>
      </Card>
      <Card className="dashboard-panel">
        <h2>Responsabilidades</h2>
        <p>
          O shell nao busca produtos e nao calcula total. Essas regras ficam
          dentro dos remotes donos de cada dominio.
        </p>
      </Card>
    </div>
  );
}

function RemoteFallback() {
  return <div className="remote-fallback">Carregando microfrontend...</div>;
}

function NavLink({
  href,
  route,
  currentRoute,
  children,
}: {
  href: string;
  route: AppRoute;
  currentRoute: AppRoute;
  children: string;
}) {
  return (
    <a href={href} aria-current={route === currentRoute ? "page" : undefined}>
      {children}
    </a>
  );
}
