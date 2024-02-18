import { NextApiResponse } from 'next/types';

export interface RateLimitResponse {
  check: (res: NextApiResponse, limit: number, token: string) => Promise<void>;
}
