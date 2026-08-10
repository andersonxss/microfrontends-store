export type MicrofrontendName = "shell" | "products" | "cart";

export type MicrofrontendEnv = Record<string, string | undefined>;

const defaultPorts: Record<MicrofrontendName, number> = {
  shell: 4200,
  products: 4201,
  cart: 4202,
};

export function getRemoteConfig(
  env: MicrofrontendEnv,
  name: MicrofrontendName,
) {
  const prefix = name.toUpperCase();
  const url = normalizeRemoteUrl(
    env[`VITE_${prefix}_REMOTE_URL`] ?? "http://localhost",
  );
  const port = parseRemotePort(
    env[`VITE_${prefix}_REMOTE_PORT`],
    defaultPorts[name],
    `VITE_${prefix}_REMOTE_PORT`,
  );

  return {
    origin: `${url}:${port}`,
    port,
  };
}

function normalizeRemoteUrl(url: string) {
  const normalizedUrl = url.trim().replace(/\/+$/, "");

  if (normalizedUrl.length === 0) {
    return "http://localhost";
  }

  if (normalizedUrl.includes("://")) {
    return normalizedUrl;
  }

  return `http://${normalizedUrl}`;
}

function parseRemotePort(
  value: string | undefined,
  fallback: number,
  envName: string,
) {
  if (!value) {
    return fallback;
  }

  const port = Number.parseInt(value, 10);

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error(`${envName} must be a valid TCP port.`);
  }

  return port;
}
