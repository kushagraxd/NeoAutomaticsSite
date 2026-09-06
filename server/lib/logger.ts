import pino from 'pino';
import { randomUUID } from 'crypto';
import type { Request, Response, NextFunction } from 'express';

// Create logger instance
const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: process.env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  } : undefined,
});

export { logger };

/**
 * Express middleware to add request ID and logging
 */
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  // Generate unique request ID
  const requestId = randomUUID();
  
  // Add request ID to request object
  (req as any).requestId = requestId;
  
  // Add request ID to response headers
  res.setHeader('X-Request-ID', requestId);
  
  // Log incoming request
  logger.info({
    requestId,
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
  }, 'Incoming request');
  
  // Log response when finished
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      requestId,
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
    }, 'Request completed');
  });
  
  next();
}

/**
 * Get request ID from request object
 */
export function getRequestId(req: Request): string {
  return (req as any).requestId || 'unknown';
}

/**
 * Create child logger with request context
 */
export function createRequestLogger(req: Request) {
  return logger.child({
    requestId: getRequestId(req),
  });
}

/**
 * Log AI API usage for monitoring
 */
export function logAiUsage(data: {
  requestId: string;
  endpoint: string;
  model: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  duration: number;
  success: boolean;
  error?: string;
}) {
  logger.info({
    type: 'ai_usage',
    ...data,
  }, 'AI API usage');
}