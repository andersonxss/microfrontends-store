import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const apps = ["products", "cart", "shell"];

function createNpmCommand(app) {
  if (process.platform === "win32") {
    return {
      command: process.env.ComSpec ?? "cmd.exe",
      args: ["/d", "/s", "/c", `npm.cmd run dev:${app}`],
    };
  }

  return {
    command: "npm",
    args: ["run", `dev:${app}`],
  };
}

const children = apps.map((app) => {
  const { command, args } = createNpmCommand(app);
  const child = spawn(command, args, {
    cwd: root,
    stdio: "inherit",
    windowsHide: false,
  });

  child.on("error", (error) => {
    console.error(`Nao foi possivel iniciar ${app}:`, error.message);
  });

  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`${app} stopped with code ${code}`);
    }
  });

  return child;
});

function stop() {
  children.forEach((child) => child.kill());
}

process.on("SIGINT", () => {
  stop();
  process.exit(0);
});

process.on("SIGTERM", () => {
  stop();
  process.exit(0);
});
