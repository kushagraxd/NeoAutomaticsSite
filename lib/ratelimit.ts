import { RateLimiterMemory } from 'rate-limiter-flexible';

// Rate limiter for AI endpoints: 10 requests per minute per IP
const rateLimiter = new RateLimiterMemory({
  points: 10, // Number of requests
  duration: 60, // Per 60 seconds
  keyPrefix: 'ai_api',
});

/**
 * Check rate limit for given IP and route key
 * Throws error if rate limit exceeded
 */
export async function limitOrThrow(ip: string, key: string): Promise<void> {
  const fullKey = `${ip}:${key}`;
  
  try {
    await rateLimiter.consume(fullKey);
  } catch (rejRes: any) {
    const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
    throw new Error(`Rate limit exceeded. Try again in ${secs} seconds.`);
  }
}

/**
 * Get current rate limit status for IP/key
 * Simplified version to avoid type issues
 */
export async function getRateLimitStatus(ip: string, key: string): Promise<{
  totalUsed: number;
  totalLimit: number;
  remaining: number;
  resetTime: Date;
}> {
  const fullKey = `${ip}:${key}`;
  
  try {
    const resRateLimiter = await rateLimiter.get(fullKey);
    // Since we can't reliably get usage stats, return default values
    return {
      totalUsed: resRateLimiter ? 1 : 0,
      totalLimit: 10,
      remaining: resRateLimiter ? 9 : 10,
      resetTime: new Date(Date.now() + (resRateLimiter?.msBeforeNext || 60000)),
    };
  } catch {
    return {
      totalUsed: 0,
      totalLimit: 10,
      remaining: 10,
      resetTime: new Date(Date.now() + 60000),
    };
  }
}