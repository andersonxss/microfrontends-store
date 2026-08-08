import { useEffect, useState } from "react";

export type AppRoute = "/" | "/products" | "/cart";

const validRoutes = new Set<AppRoute>(["/", "/products", "/cart"]);

function readRoute(): AppRoute {
  const hash = window.location.hash.replace("#", "") || "/";
  return validRoutes.has(hash as AppRoute) ? (hash as AppRoute) : "/";
}

export function useHashRoute() {
  const [route, setRoute] = useState<AppRoute>(readRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute());

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}
