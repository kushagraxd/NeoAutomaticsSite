import express, { type NextFunction, type Request, type Response } from 'express';
import { registerRoutes } from './routes';
import { logger } from './lib/logger';

/*
 * Vercel serverless entry: the same Express API routes the Node server uses
 * (server/routes.ts), without the static-file and Vite layers — Vercel serves
 * the static front end itself. scripts/vercel-output.mjs bundles this file into
 * a self-contained function and routes /api/* to it.
 */
const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

const ready = registerRoutes(app).then(() => {
  app.use((err: { status?: number; statusCode?: number }, _req: Request, res: Response, _next: NextFunction) => {
    const status = err?.status || err?.statusCode || 500;
    logger.error({ err }, 'Unhandled request error');
    if (res.headersSent) return;
    res.status(status).json({ ok: false, message: 'Something went wrong. Please try again.' });
  });
});

export default async function handler(req: Request, res: Response) {
  await ready;
  app(req, res);
}
