import { RateLimiterMemory } from 'rate-limiter-flexible';

/** Enquiry submissions: 5 per 10 minutes per IP. */
const rfqLimiter = new RateLimiterMemory({ points: 5, duration: 600, keyPrefix: 'rfq' });

/** General API reads: 60 per minute per IP. */
const apiLimiter = new RateLimiterMemory({ points: 60, duration: 60, keyPrefix: 'api' });

const limiters = { rfq: rfqLimiter, api: apiLimiter } as const;
export type LimiterKey = keyof typeof limiters;

export class RateLimitError extends Error {
  readonly retryAfter: number;
  constructor(retryAfter: number) {
    super(`Too many requests. Please try again in ${retryAfter} seconds.`);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

export async function limitOrThrow(ip: string, key: LimiterKey): Promise<void> {
  try {
    await limiters[key].consume(ip);
  } catch (rejection: any) {
    const retryAfter = Math.max(1, Math.round((rejection?.msBeforeNext ?? 60000) / 1000));
    throw new RateLimitError(retryAfter);
  }
}
