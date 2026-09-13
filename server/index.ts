import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { logger } from "./lib/logger";

const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

app.use((req, res, next) => {
  const start = Date.now();
  const { path } = req;

  res.on("finish", () => {
    if (!path.startsWith("/api")) return;
    log(`${req.method} ${path} ${res.statusCode} in ${Date.now() - start}ms`);
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Error handler. It must NOT re-throw: doing so turns a handled request
  // into an uncaught exception and can take the whole process down.
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err?.status || err?.statusCode || 500;
    logger.error({ err }, "Unhandled request error");
    if (res.headersSent) return;
    res.status(status).json({ ok: false, message: "Something went wrong. Please try again." });
  });

  // Vite is registered after the API routes so its catch-all cannot shadow them.
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);

  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
      log(`Port ${port} is already in use. Stop the other process or set PORT to a free port.`);
    } else {
      logger.error({ err: error }, "Server failed to start");
    }
    process.exit(1);
  });

  // host 0.0.0.0 without reusePort — reusePort is unsupported on macOS.
  server.listen({ port, host: "0.0.0.0" }, () => {
    log(`serving on http://localhost:${port}`);
  });
})();
