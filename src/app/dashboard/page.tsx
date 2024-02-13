'use client';

import type { ClientSessionType } from '@/types/hooks/ClientSessionType';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, type FC } from 'react';
import './dashboard.scss';

const Dashboard: FC = () => {
  const { data: session, status }: ClientSessionType = useSession();
  const isAuthenticated: boolean = status === 'authenticated';
  const isNotAuthenticated: boolean = status === 'unauthenticated';

  useEffect(() => {
    if (isNotAuthenticated) {
      redirect('/signup');
    }
  }, [status, isNotAuthenticated]);

  return (
    <div>
      {isAuthenticated && (
        <section className="dashboard">
          <header className="dashboard_header">
            <h1>Dashboard for - {session?.user && session.user?.name}</h1>
          </header>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
