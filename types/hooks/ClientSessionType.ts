import type { Session } from 'next-auth';

export type Status = 'authenticated' | 'unauthenticated' | 'loading';
export type ClientSessionType = {
  data: Session | null;
  status: Status;
  update: (update: Session | null) => Promise<Session | null>;
};
