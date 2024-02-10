'use client';

import { useSession } from 'next-auth/react';
import './dashboard.scss';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isNotAuthenticated = status === 'unauthenticated';
  if (isNotAuthenticated) {
    window.location.href = 'http://localhost:3000/signup';
  }
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
