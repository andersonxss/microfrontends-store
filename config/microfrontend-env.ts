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
  const configuredUrl = env[`VITE_${prefix}_REMOTE_URL`];
  const configuredPort = env[`VITE_${prefix}_REMOTE_PORT`];
  const url = normalizeRemoteUrl(
    configuredUrl ?? "http://localhost",
  );
  const port = parseRemotePort(
    configuredPort,
    defaultPorts[name],
    `VITE_${prefix}_REMOTE_PORT`,
  );

  return {
    origin: configuredUrl && !configuredPort ? url : `${url}:${port}`,
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
