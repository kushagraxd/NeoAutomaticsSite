import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import { categories, productByCode } from "../shared/catalog";
import { randomUUID } from "crypto";
import viteConfig from "../vite.config";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
  });
  console.log(`${time} [${source}] ${message}`);
}

/** Routes the SPA owns. Anything else must return a real 404 status. */
const APP_ROUTES = [
  "/", "/products", "/custom-sourcing", "/about", "/quote", "/contact", "/privacy",
];

const CATEGORY_SLUGS = new Set(categories.map((c) => c.slug));

function isAppRoute(url: string): boolean {
  const pathname = url.split("?")[0].replace(/\/+$/, "") || "/";
  if (APP_ROUTES.includes(pathname)) return true;

  // /products/:category and /products/:category/:code — the slug must be real
  const match = /^\/products\/([A-Za-z0-9-]+)(?:\/([A-Za-z0-9.%\-]+))?$/.exec(pathname);
  if (!match) return false;
  if (!CATEGORY_SLUGS.has(match[1])) return false;
  if (!match[2]) return true;
  return productByCode(decodeURIComponent(match[2])) !== undefined;
}

export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: { middlewareMode: true, hmr: { server }, allowedHosts: true as const },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const templatePath = path.resolve(import.meta.dirname, "..", "client", "index.html");
      let template = await fs.promises.readFile(templatePath, "utf-8");
      template = template.replace(`src="/src/main.tsx"`, `src="/src/main.tsx?v=${randomUUID()}"`);
      const page = await vite.transformIndexHtml(url, template);
      res
        .status(isAppRoute(url) ? 200 : 404)
        .set({ "Content-Type": "text/html" })
        .end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(`Could not find the build directory: ${distPath}. Run "npm run build" first.`);
  }

  app.use(express.static(distPath));

  app.use("*", (req, res) => {
    res
      .status(isAppRoute(req.originalUrl) ? 200 : 404)
      .sendFile(path.resolve(distPath, "index.html"));
  });
}
