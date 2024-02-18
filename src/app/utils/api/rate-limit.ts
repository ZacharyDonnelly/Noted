import { INTERVAL, UNIQUE_TOKEN_PER_INTERVAL } from '@/constants/rateLimit';
import { RateLimitResponse } from '@/types/utils/rateLimit';
import { LRUCache } from 'lru-cache';
import type { NextApiResponse } from 'next';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export default function rateLimit(options?: Options): RateLimitResponse {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || UNIQUE_TOKEN_PER_INTERVAL,
    ttl: options?.interval || INTERVAL
  });

  return {
    check: (res: NextApiResponse, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;
        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader('X-RateLimit-Remaining', isRateLimited ? 0 : limit - currentUsage);

        // eslint-disable-next-line no-promise-executor-return
        return isRateLimited ? reject() : resolve();
      })
  };
}
