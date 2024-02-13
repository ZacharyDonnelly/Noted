import type { Session } from 'next-auth';

export enum StatusOptions {
  authenticated = 'authenticated',
  unauthenticated = 'unauthenticated',
  loading = 'loading'
}

export type Status = {
  status: StatusOptions;
};

export type ClientSessionType = {
  data: Session | null;
  status: Status;
  update: (update: Session | null) => Promise<Session | null>;
};
