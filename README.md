# Microfrontends com Vite, Module Federation e TypeScript

Este projeto e um estudo mais proximo do mercado atual:

- `apps/shell`: host da aplicacao, layout global, menu, autenticacao fake e roteamento.
- `apps/products`: remote responsavel por lista, busca, telas e regras de produto.
- `apps/cart`: remote responsavel por carrinho, quantidade, total e regras de carrinho.
- `packages/shared`: componentes, tipos e utilitarios compartilhados.

## Por Que Esta Estrutura

Clean Architecture organiza as regras dentro de um modulo. Microfrontend divide a aplicacao em apps independentes.

```txt
microfrontends/
  apps/
    shell/
    products/
    cart/
  packages/
    shared/
```

## Como Rodar

Instale as dependencias:

```bash
npm install
```

Suba os tres apps em modo desenvolvimento:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:4200
```

Portas:

```txt
shell    -> http://localhost:4200
products -> http://localhost:4201
cart     -> http://localhost:4202
```

Tambem pode rodar separado:

```bash
npm run dev:shell
npm run dev:products
npm run dev:cart
```

## Contratos De Module Federation

`products` expoe:

```txt
products/ProductsApp
```

`cart` expoe:

```txt
cart/CartApp
cart/CartBadge
cart/cartStore
```

O `shell` consome esses modulos como se fossem imports normais:

```ts
import ProductsApp from "products/ProductsApp";
import CartApp from "cart/CartApp";
import CartBadge from "cart/CartBadge";
import { addProductToCart } from "cart/cartStore";
```

Esses imports sao declarados para o TypeScript em:

```txt
apps/shell/src/remotes.d.ts
```

## Shared

O pacote `@mfe/shared` contem apenas contratos e UI generica:

```txt
packages/shared/src/
  ui/
  types/
  utils/
```

Exemplo:

```ts
import { Button, Card, type ProductSummary } from "@mfe/shared";
```

Evite colocar regra de produto ou regra de carrinho em `shared`. Regra de dominio deve ficar no remote dono do dominio.

## Validacao

```bash
npm run typecheck
npm run build
```

Se a instalacao ainda nao tiver sido feita, esses comandos vao reclamar de
pacotes ausentes como `vite`, `@vitejs/plugin-react` e
`@module-federation/vite`.

## Mapa Mental

```txt
shell
  integra remotes
  controla layout global
  controla sessao e rotas

products
  controla dados, regras e tela de produtos
  chama onAddToCart recebido do shell

cart
  controla estado e regras do carrinho
  expoe store e componentes para o shell

shared
  fornece componentes genericos, tipos e utilitarios
```
