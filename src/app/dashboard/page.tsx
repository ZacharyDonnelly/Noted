'use client';

import { useSession } from 'next-auth/react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useEffect, type FC } from 'react';
import './dashboard.scss';

const Dashboard: FC = () => {
  const { data: session, status } = useSession();
  const isAuthenticated: boolean = status === 'authenticated';
  const isNotAuthenticated: boolean = status === 'unauthenticated';
  const router: AppRouterInstance = useRouter();

  useEffect((): void => {
    if (isNotAuthenticated) {
      router.push('/');
    }
  }, [router, isNotAuthenticated]);

  return (
    <div>
      {isAuthenticated && (
        <section className="dashboard">
          <header className="dashboard_header">
            <h1>Dashboard for - {session?.user?.name}</h1>
          </header>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
